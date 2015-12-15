#pragma strict

var left : Vector3 = Vector3.left;
var right : Vector3 = Vector3.right;
var up : Vector3 = Vector3.up;
var down : Vector3 = Vector3.down;


var leftnum : boolean;
var rightnum : boolean;
var upnum : boolean;
var downnum : boolean;

var cam : GameObject;

var P1 : boolean = true;
var P2 : boolean;
var P1win : int;
var P2win : int;

var work : boolean;

var red : Material;
var green : Material;

function Update () {
    if(Input.GetMouseButtonDown(0)) {
        wait();
    }
    if(Input.GetMouseButtonUp(0)) {
        if(work == true) {
            wait2();
        }
        wait3();
    }
}

function wait() {
    yield 0;
    if(cam.GetComponent(lookat).cube.name == "box(Clone)") {
        work = true;
    }
}

function wait2() {
    yield 0;
    yield 0;
    yield 0;
    yield 0;
    if(cam.GetComponent(lookat).cube.name != "box(Clone)") {
        P1 = cam.GetComponent(lookat).P1;
        P2 = cam.GetComponent(lookat).P2;
        work = false;
    }
}

function wait3() {
    yield 0;
    var hit : RaycastHit;
    if(Physics.Raycast (transform.position, left, 0.6) && leftnum == false) {
        leftnum = true;
    }
    if(Physics.Raycast (transform.position, right, 0.6) && rightnum == false) {
        rightnum = true;
    }
    if(Physics.Raycast (transform.position, up, 0.6) && upnum == false) {
        upnum = true;
    }
    if(Physics.Raycast (transform.position, down, 0.6) && downnum == false) {
        downnum = true;
    }
    yield 0;
    if(leftnum == true && rightnum == true && upnum == true && downnum == true) {
        if(P1 == true) {
            P1win = 1;
            GetComponent(Renderer).material = red;
            gameObject.GetComponent(Score).enabled = false;
        }
        else if(P2 == true) {
            P2win = 1;
            GetComponent(Renderer).material = green;
            gameObject.GetComponent(Score).enabled = false;
        }
    }
}