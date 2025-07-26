use ic_cdk::api::management_canister::http_request::{
    http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod,
    TransformArgs, TransformContext, TransformFunc, HttpResponse,
};
use ic_cdk::{query, update};
use candid::{CandidType, Deserialize, Func};
use serde::Serialize;
use base64::{engine::general_purpose, Engine as _};

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

#[derive(CandidType, Deserialize)]
struct FileResponse {
    filename: String,
    file_data: Vec<u8>,
}

#[derive(Deserialize)]
struct RunResponse {
    id: String,
}

#[derive(CandidType, Deserialize)]
pub struct StyleStatusResult {
    pub status: String,
    pub image: Option<Vec<u8>>,
}

#[query]
fn transform(raw: TransformArgs) -> HttpResponse {
    HttpResponse {
        status: raw.response.status,
        headers: vec![],
        body: raw.response.body,
    }
}

#[update]
pub async fn send_http_post(source_image: String, target_image: String) -> String {

    ic_cdk::println!("[DEBUG] Source image size: {}", source_image.len());
    ic_cdk::println!("[DEBUG] Target image size: {}", target_image.len());

    // let source_b64 = general_purpose::STANDARD.encode(&source_image);
    // let target_b64 = general_purpose::STANDARD.encode(&target_image);

    // ic_cdk::println!("[DEBUG] Source image (base64, truncated): {}", &source_b64[..100.min(source_b64.len())]);
    // ic_cdk::println!("[DEBUG] Target image (base64, truncated): {}", &target_b64[..100.min(target_b64.len())]);

    let url = "https://api.runpod.ai/v2/5mda0g6op5ezbx/run";


    let payload = InputPayload {
        input: InputImages {
            source_image: source_image,
            target_image: target_image,
            source_indexes: "-1".to_string(),
            target_indexes: "-1".to_string(),
            background_enhance: true,
            face_restore: true,
            face_upsample: true,
            upscale: 1,
            codeformer_fidelity: 0.2,
            output_format: "JPEG".to_string(),
        },
    };

    let json_payload = serde_json::to_vec(&payload).expect("Failed to serialize payload");

    let request_headers = vec![
        HttpHeader {
            name: "Host".to_string(),
            value: "api.runpod.ai".to_string(),
        },
        
        HttpHeader {
            name: "Authorization".to_string(),
            value: "{YOUR_API_KEY}".to_string(),
        },

        HttpHeader {
            name: "User-Agent".to_string(),
            value: "demo_HTTP_POST_canister".to_string(),
        },
        HttpHeader {
            name: "Idempotency-Key".to_string(),
            value: "UUID-123456789".to_string(),
        },
        HttpHeader {
            name: "Content-Type".to_string(),
            value: "application/json".to_string(), // <--- penting!
        },
    ];

    let request = CanisterHttpRequestArgument {
        url: url.to_string(),
        max_response_bytes: None,
        method: HttpMethod::POST,
        headers: request_headers,
        body: Some(json_payload),
        transform: Some(TransformContext {
            function: TransformFunc(Func {
                principal: ic_cdk::id(),
                method: "transform".to_string(),
            }),
            context: vec![],
        }),
    };

    match http_request(request, 10_000_000_000).await {
            Ok((response,)) => {
                let body = String::from_utf8_lossy(&response.body);
                ic_cdk::println!("[DEBUG] POST STYLE JSON: {}", body);
                match serde_json::from_str::<RunResponse>(&body) {
                    Ok(run_response) => run_response.id,
                    Err(_) => "".to_string(),
                }
            }
            Err((_r, m)) => {
                m.to_string()
            }

        }

}

#[update]
pub async fn check_style_status(job_id: String) -> StyleStatusResult {
    ic_cdk::println!("[DEBUG] Job ID: {}", job_id); 

    let url = format!("https://api.runpod.ai/v2/5mda0g6op5ezbx/status/{}", job_id);

    let headers = vec![HttpHeader {
        name: "Authorization".to_string(),
        value: "Bearer rpa_RMCSD2B6VUZU6I4102T3B7YB2V7AUIIWVORZNQ4Tthds79".to_string(),
    }];

    let request = CanisterHttpRequestArgument {
        url,    
        max_response_bytes: Some(2_000_000),
        method: HttpMethod::GET,
        headers,
        body: None,
        transform: Some(TransformContext {
            function: TransformFunc(Func {
                principal: ic_cdk::id(),
                method: "transform".to_string(),
            }),
            context: vec![],
        }),
    };

    match http_request(request, 10_000_000_000).await {
        Ok((response,)) => {
            let body_str = String::from_utf8_lossy(&response.body);
            ic_cdk::println!("[DEBUG] HTTP Response Body Length: {}", body_str.len());

            // Usahakan parse JSON
            if let Ok(value) = serde_json::from_str::<serde_json::Value>(&body_str) {
                let status = value.get("status").and_then(|s| s.as_str()).unwrap_or("INVALID");

                ic_cdk::println!("[DEBUG] Parsed Status Field: {}", status);

                let image_b64 = value.get("output")
                .and_then(|o| {
                    ic_cdk::println!("[DEBUG] Output field found");

                    // Cetak seluruh isi output jika ingin lihat semua isinya
                    ic_cdk::println!("[DEBUG] Output content: {:?}", o);

                    o.get("image")
                })
                .and_then(|i| {
                    ic_cdk::println!("[DEBUG] Image field found");

                    let img_url = i.as_str();
                    ic_cdk::println!("[DEBUG] Raw image (base64 or URL): {:?}", img_url);

                    img_url
                });


                if let Some(b64_str) = &image_b64 {
                    ic_cdk::println!("[DEBUG] Base64 image string length: {}", b64_str.len());
                } else {
                    ic_cdk::println!("[DEBUG] No base64 image found");
                }

                let decoded_image = image_b64
                    .and_then(|s| {
                        let decoded = general_purpose::STANDARD.decode(s);
                        match &decoded {
                            Ok(data) => ic_cdk::println!("[DEBUG] Decoded image length: {}", data.len()),
                            Err(e) => ic_cdk::println!("[DEBUG] Failed to decode base64 image: {}", e),
                        }
                        decoded.ok()
                    });

                let final_status = if decoded_image.is_some() {
                    "COMPLETED".to_string()
                } else {
                    status.to_string()
                };

                ic_cdk::println!("[DEBUG] Final status: {}", final_status);

                return StyleStatusResult {
                    status: final_status,
                    image: decoded_image,
                };
            }


            // Fallback jika parsing JSON gagal
            ic_cdk::println!("[DEBUG] Failed to parse response JSON.");
            StyleStatusResult {
                status: "INVALID".to_string(),
                image: None,
            }
        }
        Err((_r, m)) => StyleStatusResult {
            status: format!("ERROR: {}", m),
            image: None,
        },
    }

}

