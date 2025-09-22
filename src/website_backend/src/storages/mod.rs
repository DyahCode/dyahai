use candid::Principal;
pub mod types;
pub use types::*;


pub fn save_image(principal: Principal, metadata: Metadata) {
    ic_cdk::println!("Saving Metadata...");
    IMAGE_STORE.with(|store| {
        store
            .borrow_mut()
            .entry(principal)
            .or_insert_with(Vec::new)
            .push(metadata);
    });
    ic_cdk::println!("Metadata has been saved.");
}

pub fn retrieve_images(principal: Principal) -> Vec<Metadata> {
    IMAGE_STORE.with(|store| {
        if let Some(metadata) = store.borrow().get(&principal) {
            ic_cdk::println!("Metadata has been loaded, total Metadata: {}", metadata.len());
            metadata.clone()
        } else {
            ic_cdk::println!("No Metadata found for principal: {:?}", principal.to_string());
            let notfoundimages: Vec<Metadata> = vec![];
            notfoundimages
        }
    })
}
pub fn delete_image(principal: Principal, index: usize) {
    ic_cdk::println!("Trying to delete Metadata at index: {}", index);

    IMAGE_STORE.with(|store| {
        let mut store = store.borrow_mut();

        if let Some(metadata) = store.get_mut(&principal) {
            if index < metadata.len() {
                metadata.remove(index);
                ic_cdk::println!("Metadata at index: {} has been deleted", index);
                ic_cdk::println!("Metadata has been loaded, total Metadata: {}", metadata.len());
            } else {
                ic_cdk::println!("Invalid index, Metadata not found.");
            }
        } else {
            ic_cdk::println!("No Metadata found for this principal.");
            ic_cdk::trap("No Metadata found for this principal.");
        }
    })
}
