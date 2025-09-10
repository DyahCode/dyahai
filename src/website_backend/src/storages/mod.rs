use candid::Principal;
pub mod types;
pub use types::*;


pub fn save_image(principal: Principal, cid: String) {
    ic_cdk::println!("Saving CID...");
    IMAGE_STORE.with(|store| {
        store
            .borrow_mut()
            .entry(principal)
            .or_insert_with(Vec::new)
            .push(cid);
    });
    ic_cdk::println!("CID has been saved.");
}

pub fn retrieve_images(principal: Principal) -> Vec<String> {
    // Mengambil semua gambar yang terkait dengan Principal
    IMAGE_STORE.with(|store| {
        if let Some(cid) = store.borrow().get(&principal) {
            ic_cdk::println!("CID has been loaded, total CID: {}", cid.len());
            cid.clone()
        } else {
            ic_cdk::println!("No CID found for principal: {:?}", principal.to_string());
            let notfoundimages: Vec<String> = vec![];
            notfoundimages
        }
    })
}
pub fn delete_image(principal: Principal, index: usize) -> Vec<String> {
    ic_cdk::println!("Trying to delete CID at index: {}", index);

    IMAGE_STORE.with(|store| {
        let mut store = store.borrow_mut();

        if let Some(cid) = store.get_mut(&principal) {
            if index < cid.len() {
                cid.remove(index);
                ic_cdk::println!("CID at index: {} has been deleted", index);
                ic_cdk::println!("CID has been loaded, total CID: {}", cid.len());
            } else {
                ic_cdk::println!("Invalid index, CID not found.");
            }
        } else {
            ic_cdk::println!("No CID found for this principal.");
        }
        store.get(&principal).cloned().unwrap_or_default()
    })
}
