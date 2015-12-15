#pragma strict

var alive : boolean = true;
var stop : boolean;

function OnTriggerEnter (other : Collider) {
    if(stop == false) {
        Destroy(gameObject);
    }
}