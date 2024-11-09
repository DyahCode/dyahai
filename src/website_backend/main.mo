import Blob "mo:base/Blob";
import Cycles "mo:base/ExperimentalCycles";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Array "mo:base/Array";
import Types "Types";


actor {
    type Credit = {
        principal: Text;
        balance: Nat;
    };
    
    stable var credits: [Credit] = [];

    public shared query({caller}) func greet(name : Text) : async Text {
        return "Hello, " # name # "! " # "your principal id: " # Principal.toText(caller);
    };

    public query func transform(raw : Types.TransformArgs) : async Types.CanisterHttpResponsePayload {
        let transformed : Types.CanisterHttpResponsePayload = {
            status = raw.response.status;
            body = raw.response.body;
            headers = [
                {
                    name = "Content-Security-Policy";
                    value = "default-src 'self'";
                },
                { name = "Referrer-Policy"; value = "strict-origin" },
                { name = "Permissions-Policy"; value = "geolocation=(self)" },
                {
                    name = "Strict-Transport-Security";
                    value = "max-age=63072000";
                },
                { name = "X-Frame-Options"; value = "DENY" },
                { name = "X-Content-Type-Options"; value = "nosniff" },
            ];
        };
        transformed;
    };

    public shared func send_http_post_request(image : Blob, style : Blob, principalId : Text) : async Blob {
        let balance = await getBalance(principalId);

        if (balance == 0) {
            Debug.print("Kredit tidak ditemukan atau habis untuk principal: " # principalId);
            return Blob.fromArray([]);
        } else {
            if (balance > 0) {
                reduceCredit(principalId);
            } else {
                Debug.print("Kredit habis untuk principal: " # principalId);
                return Blob.fromArray([]);
            };
        };

        let imageSize: Nat = image.size();
        Debug.print("Received image with size: " # Nat.toText(imageSize) # " bytes");
        let styleSize: Nat = style.size();
        Debug.print("Received style with size: " # Nat.toText(styleSize) # " bytes");

        let ic : Types.IC = actor ("aaaaa-aa");

        let url = "https://tabella.my.id/api/generate";

        let idempotency_key: Text = generateUUID();
        let request_headers = [
            { name = "User-Agent"; value = "request_backend" },
            { name = "Content-Type"; value = "application/octet-stream" },
            { name = "Idempotency-Key"; value = idempotency_key }
        ];

        let imageData = Blob.toArray(image);
        let styleData = Blob.toArray(style);
        let combinedData = Array.append<Nat8>(styleData, imageData);
        let bodyBlob = Blob.fromArray(combinedData);

        Cycles.add<system>(21_850_258_000);

        let http_request : Types.HttpRequestArgs = {
            url = url;
            max_response_bytes = null;
            headers = request_headers;
            body = ?bodyBlob;
            method = #post;
            transform = null;
        };

        let http_response : Types.HttpResponsePayload = await ic.http_request(http_request);

        let savedImage = await SaveImages(http_response.body, principalId);
        Debug.print("Image saved with principal: " # savedImage.principal);

        return http_response.body;
    };

    func reduceCredit(principalId: Text) {
    credits := Array.map<Credit, Credit>(credits, func(credit: Credit) : Credit {
        if (credit.principal == principalId) {
            { principal = credit.principal; balance = credit.balance - 1 };
        } else {
            credit;
        }
    });
    };

    func findCredit(principalId: Text) : ?Credit {
        Array.find<Credit>(credits, func(credit) {
            credit.principal == principalId
        });
    };

    public shared query func getBalance(principalId: Text) : async Nat {
        switch (findCredit(principalId)) {
            case null {
                return 0;
            };
            case (?existingCredit) {
                return existingCredit.balance;
            };
        }
    };

    func generateUUID() : Text {
        let timestamp = Time.now();
        let seconds = timestamp / 1_000_000_000;
        return "UUID-" # Int.toText(seconds);
    };

    type Image = {
        principal: Text;
        data: Blob;
    };

    stable var images: [Image] = [];
    
    public shared func SaveImages(data: Blob, principalId: Text) : async {principal: Text; data: Blob} {
        let newImage: Image = {
            principal = principalId;
            data = data;
        };
        images := Array.append(images, [newImage]);
        
        return { principal = principalId; data = data };
    };

    public shared query func getImages() : async [Image] {
        return images;
    };

    public shared query func getImagesByPrincipal(principalId: Text) : async [Image] {
        let filteredImages: [Image] = Array.filter<Image>(images, func (img: Image) : Bool {
            img.principal == principalId;
        });
        return filteredImages;
    };

    public shared func deleteAllImages() : async Bool {
        images := [];
        return true;
    };

    public shared func deleteImageByPrincipalAndData(principalId: Text, imageData: [Nat8]) : async Bool {
        let originalSize = images.size();

        if (imageData.size() == 0) {
            return false; 
        };

        images := Array.filter<Image>(images, func(img: Image): Bool {
            let imgDataArray = Blob.toArray(img.data);
            img.principal != principalId or imgDataArray != imageData
        });

        return images.size() < originalSize;
    };

    public shared func initializeCredit(principalId: Text) : async () {
    Debug.print("Inisialisasi credit");

    if (findCredit(principalId) == null) {
        credits := Array.append(credits, [{ principal = principalId; balance = 3 }]);
        Debug.print("Credit initialized for principal: " # principalId # " with balance: 3");
    } else {
        Debug.print("credit sudah dibuat");
    }
};

public shared func addCredit(principalId: Text, amount: Nat) : async Text {
    switch (findCredit(principalId)) {
        case null {
            credits := Array.append(credits, [{ principal = principalId; balance = amount }]);
            Debug.print("Credit added for principal: " # principalId # " with balance: " # Nat.toText(amount));
            return "Credit added for principal: " # principalId # " with balance: " # Nat.toText(amount);
        };
        case (?existingCredit) {
            let newBalance = existingCredit.balance + amount;
            credits := Array.map<Credit, Credit>(credits, func(credit: Credit) : Credit {
                if (credit.principal == principalId) {
                    { principal = credit.principal; balance = newBalance };
                } else {
                    credit;
                }
            });
            Debug.print("Credit updated for principal: " # principalId # " with new balance: " # Nat.toText(newBalance));
            return "Credit updated for principal: " # principalId # " with new balance: " # Nat.toText(newBalance);
        };
    }
};
};






