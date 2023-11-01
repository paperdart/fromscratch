function typewriter(elementid, texttotype){
    //console.log('typewriter start: '+elementid);    
    var length = document.getElementById(elementid).innerHTML.length;
    if (length < texttotype.length) {
        //console.log(texttotype.substring(0,length+1));
        document.getElementById(elementid).innerHTML = texttotype.substring(0,length+1);
        //console.log(texttotype.substring(length,length+1));
        if (texttotype.substring(length,length+1) != ' ') {
            let keypress = new Audio('./shared/keypress.mp3');  
            keypress.play();
        }
    } else {
        clearInterval(typewriter)
    }
}

//window.setInterval(typewriter, 200,'neo','Wake up, Neo...\nThe Matrix has you...\nFollow the white rabbit.      \n\n\n\n\nKnock, knock, Neo.');