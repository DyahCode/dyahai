
use base64::{engine::general_purpose, Engine as _};
use ic_cdk::api::management_canister::http_request::{
    http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod, HttpResponse, TransformArgs,
    TransformContext, TransformFunc,
};
use ic_cdk::{query, update};
use serde::Serialize;

#[derive(Serialize)]
struct InputPayload {
    input: InputImages,
}

#[derive(Serialize)]
struct InputImages {
    source_image: String,
    target_image: String,
    source_indexes: String,
    target_indexes: String,
    background_enhance: bool,
    face_restore: bool,
    face_upsample: bool,
    upscale: u8,
    codeformer_fidelity: f32,
    output_format: String,
}

#[query(name = "transform")]
fn transform(raw: TransformArgs) -> HttpResponse {
    HttpResponse {
        status: raw.response.status,
        headers: vec![],
        body: raw.response.body,
    }
}

const FLASK_BASE: &str = "https://dyahai-proxy.vercel.app/style";

#[update]
pub async fn send_http_post(source_image: String, target_image: String) -> Vec<u8> {
    ic_cdk::println!("[DEBUG] Source URL: {}", source_image);
    ic_cdk::println!("[DEBUG] Target URL: {}", target_image);

    let url = format!("{}/run", FLASK_BASE);

    let payload = InputPayload {
        input : InputImages {
        source_image,
        target_image,
        source_indexes: "-1".to_string(),
        target_indexes: "-1".to_string(),
        background_enhance: true,
        face_restore: true,
        face_upsample: true,
        upscale: 1,
        codeformer_fidelity: 0.2,
        output_format: "JPEG".to_string(),
    }};

    let json_payload = serde_json::to_vec(&payload).expect("Failed to serialize payload");

    let request_headers = vec![
        HttpHeader {
            name: "Content-Type".to_string(),
            value: "application/json".to_string(),
        },
        HttpHeader {
            name: "X-Idempotency-Key".to_string(),
            value: format!("{}{}", ic_cdk::api::caller().to_text(),ic_cdk::api::time().to_string()),
        },
    ];

    let request = CanisterHttpRequestArgument {
        url,
        max_response_bytes: Some(2_000_000),
        method: HttpMethod::POST,
        headers: request_headers,
        body: Some(json_payload),
        transform: Some(TransformContext {
            function: TransformFunc(candid::Func {
                principal: ic_cdk::api::id(),
                method: "transform".to_string(),
            }),
            context: vec![],
        }),
    };

    match http_request(request, 21_000_000_000).await {
        Ok((response,)) => {
            let body_str = String::from_utf8_lossy(&response.body);
            ic_cdk::println!("[DEBUG] Raw response: {}", body_str);

            if let Ok(value) = serde_json::from_str::<serde_json::Value>(&body_str) {
                let status = value
                    .get("status")
                    .and_then(|s| s.as_str())
                    .unwrap_or("INVALID");
                ic_cdk::println!("[DEBUG] Status: {}", status);

                let image_b64 = value
                    .get("output")
                    .and_then(|o| o.get("image"))
                    .and_then(|i| i.as_str());

                if let Some(b64_str) = &image_b64 {
                    ic_cdk::println!("[DEBUG] Base64 length: {}", b64_str.len());
                }

                let decoded_image =
                    image_b64.and_then(|s| general_purpose::STANDARD.decode(s).ok());
                decoded_image.unwrap_or(vec![])
            } else {
                ic_cdk::println!("[DEBUG] Failed to parse JSON.");
                vec![]
            }
        }
        Err((_r, _m)) => {
            vec![]
        }
    }
}
