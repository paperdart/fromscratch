// target elements with the "draggable" class
interact('.draggable')
  .draggable({    
    inertia: true,    
    modifiers: [ interact.modifiers.restrictRect({ restriction: 'parent', endOnly: true }) ],    
    autoScroll: true,
    listeners: { move: dragMoveListener }
  }
)

interact('.tap-target').on('tap', function (event) { toggleHide (event); })

function toggleHide (event) {
    var targetid = event.target.attributes.targetid.nodeValue;    
    var target = document.getElementById(targetid);    
    target.classList.toggle('hide');
    switch(targetid) {
    case 'finder':
      console.log('run whereami');
      whereAmI();
      break;
    case 'console':
      console.log('set interval typewriter');
      window.setInterval(typewriter, 200,'neo','Wake up, Neo...\nThe Matrix has you...\nFollow the white rabbit.      \n\n\n\n\nKnock, knock, Neo.');
      break;
    case 'hauraki':
      console.log('load youtube video');
      document.getElementById('hauraki-video').innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/pUnKgU3r1cI?si=umvT7MtlXlI5gjG_&amp;controls=0?autoplay=1" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture; web-share"></iframe>';
      break;
    case 'earthnull':
      console.log('load earthnull');
      document.getElementById('earthnull-video').innerHTML = '<iframe height=100% width=100% src="https://earth.nullschool.net/#current/wind/surface/level/orthographic=-184.90,-35.60,4550"></iframe>';
      break;
    default:

    }
       
}


// DRAG MOVE A WINDOW
function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}
window.dragMoveListener = dragMoveListener;

// UPDATE DEATHCLOCK
function updateCountdown(elementid,enddatetime){
  // calculate the remaining time
  var remaining = new Date(enddatetime).getTime() - new Date().getTime();
      
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  var hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2,'0');
  var minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2,'0');
  var seconds = Math.floor((remaining % (1000 * 60)) / 1000).toString().padStart(2,'0');
  var milliseconds = Math.floor((remaining % (1000))).toString().padStart(3,'0');

  document.getElementById(elementid).innerHTML = days + "d " + hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
window.setInterval(updateCountdown, 59,'timeuntil', '2024-03-03T10:30:00');

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