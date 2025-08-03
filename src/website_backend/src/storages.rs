use ic_cdk::{  query, update};
use std::cell::RefCell;
use std::collections::BTreeMap;
use candid::Principal;

pub type ImageStore = BTreeMap<Principal, Vec<String>>;

thread_local! {
    pub static IMAGE_STORE: RefCell<ImageStore> = RefCell::default();
}

#[update]
pub fn save_image(principal: Principal, cid: String) {
    ic_cdk::println!("sedang menyimpan CID");
    IMAGE_STORE.with(|store| {
        store
            .borrow_mut()
            .entry(principal)
            .or_insert_with(Vec::new)
            .push(cid);
    });
    ic_cdk::println!("CID telah disimpan");
}

#[query]
pub fn retrieve_images(principal: Principal) -> Vec<String> {
    // Mengambil semua gambar yang terkait dengan Principal
    IMAGE_STORE.with(|store| {
        if let Some(cid) = store.borrow().get(&principal) {
            ic_cdk::println!("CID telah di load, jumlah CID: {}", cid.len());
            cid.clone()
        } else {
            ic_cdk::println!("No CID found for principal: {:?}", principal.to_string());
            let notfoundimages: Vec<String>  = vec![];
            notfoundimages
        }
    })
}
#[update]
pub fn delete_image(principal: Principal, index: usize) -> Vec<String> {
    ic_cdk::println!("Mencoba menghapus CID dengan indeks: {}", index);
    
    IMAGE_STORE.with(|store| {
        let mut store = store.borrow_mut();
        
        if let Some(cid) = store.get_mut(&principal) {
            if index < cid.len() {
                // Hapus CID berdasarkan indeks
                cid.remove(index);
                ic_cdk::println!("CID dengan indeks: {} telah dihapus", index);
                ic_cdk::println!("CID telah di load, jumlah CID: {}", cid.len());
            } else {
                ic_cdk::println!("Indeks tidak valid, CID tidak ditemukan.");
            }
        } else {
            ic_cdk::println!("Tidak ada CID yang terkait dengan principal ini.");
        }

        // Kembalikan daftar CID yang tersisa setelah penghapusan
        store.get(&principal).cloned().unwrap_or_default()
    })
}
