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
    //console.log(event.target.attributes.targetid.nodeValue);
    var target = document.getElementById(event.target.attributes.targetid.nodeValue);
    //console.log(target);
    target.classList.toggle('hide');   
}

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

function updateCountdown(updatecontrol,enddatetime){
    //console.log('updateCountdown start');
    //console.log(updatecontrol);
    //console.log(enddatetime);

    var remaining = new Date(enddatetime).getTime() - new Date().getTime();
    //console.log(remaining);

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    var hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    var milliseconds = Math.floor((remaining % (1000)));

    document.getElementById(updatecontrol).innerHTML = days + "d " + hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
window.setInterval(updateCountdown, 10,'timeuntil', '2023-11-01T04:00:00');

window.dragMoveListener = dragMoveListener;