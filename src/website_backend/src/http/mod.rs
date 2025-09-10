pub use crate::users::*;
pub use ic_cdk::{
    api::management_canister::http_request::{
        http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod, HttpResponse,
        TransformArgs, TransformContext, TransformFunc,
    },
    query, update,
};
use std::vec;
mod types;
pub use types::*;

#[query(name = "transform")]
fn transform(raw: TransformArgs) -> HttpResponse {
    HttpResponse {
        status: raw.response.status,
        headers: vec![],
        body: raw.response.body,
    }
}

#[update]
pub async fn send_http_post(source_image: String, target_image: String) -> ResponseAPI {
    let principal = ic_cdk::caller();
    ic_cdk::println!("Principal: {}", principal);

    if !is_registered(principal) {
        ic_cdk::trap("User not registered");
    }

    let user_data = get_user_data(principal.clone());

    if user_data.credits == 0 {
        ic_cdk::println!("Insufficient credit for this user");
        return ResponseAPI {
            status: false,
            message: "Insufficient credit for this user".to_string(),
            result: "null".to_string(),
        };
    }

    ic_cdk::println!("[DEBUG] Source URL: {}", source_image);
    ic_cdk::println!("[DEBUG] Target URL: {}", target_image);

    let url = format!("{}/run", API_BASE);

    let payload = InputPayload {
        input: InputImages {
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
        },
    };

    let json_payload = serde_json::to_vec(&payload).expect("Failed to serialize payload");

    let request_headers = vec![
        HttpHeader {
            name: "Content-Type".to_string(),
            value: "application/json".to_string(),
        },
        HttpHeader {
            name: "X-Idempotency-Key".to_string(),
            value: format!(
                "{}{}",
                ic_cdk::api::caller().to_text(),
                ic_cdk::api::time().to_string()
            ),
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
                if let Some(error) = value.get("error") {
                    return ResponseAPI {
                        status: false,
                        message: error
                            .as_str()
                            .unwrap_or("Failed to check job status")
                            .to_string(),
                        result: "null".to_string(),
                    };
                }
                let status = value
                    .get("status")
                    .and_then(|s| s.as_str())
                    .unwrap_or("INVALID");

                ic_cdk::println!("[DEBUG] Status: {}", status);

                let image_b64 = value
                    .get("output")
                    .and_then(|o| o.get("image"))
                    .and_then(|i| i.as_str());
                reduction_credit(principal.clone());
                ResponseAPI {
                    status: true,
                    message: "completed".to_string(),
                    result: image_b64.unwrap_or("").to_string(),
                }
            } else {
                ic_cdk::println!("[DEBUG] Failed to parse JSON.");

                ResponseAPI {
                    status: false,
                    message: "failed parse JSON".to_string(),
                    result: "null".to_string(),
                }
            }
        }
        Err((_r, _m)) => ResponseAPI {
            status: false,
            message: _m.to_string(),
            result: "null".to_string(),
        },
    }
}
