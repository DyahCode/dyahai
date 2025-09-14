use candid::{CandidType};
use serde::Serialize;
use std::vec;

#[derive(Serialize)]
pub struct InputPayload {
    pub input: InputImages,
}
#[derive(Serialize)]
pub struct InputImages {
    pub source_image: String,
    pub target_image: String,
    pub source_indexes: String,
    pub target_indexes: String,
    pub background_enhance: bool,
    pub face_restore: bool,
    pub face_upsample: bool,
    pub upscale: u8,
    pub codeformer_fidelity: f32,
    pub output_format: String,
}

pub const API_BASE: &str = "https://dyahai-proxy.vercel.app/style";

#[derive(Serialize, CandidType, Debug)]
pub struct ResponseAPI {
    pub status: bool,
    pub message: String,
    pub result: String,
}
