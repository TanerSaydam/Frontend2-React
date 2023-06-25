function topla(x,y){
    console.log(x + y);
}

function mesaj(){
    console.log("İşlem yapılıyor lütfen bekleyiniz....")
}

function islem(callback){
    callback();
    topla(1,2);
}


islem(()=> {
    
});


