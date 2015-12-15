#pragma strict

var cube : GameObject;
var example : GameObject;
var P1 : boolean = true;
var P2 : boolean;

var lay : GameObject[];
var lay2 : GameObject[];
var colours : GameObject[];

var red : Material;
var green : Material;

var P1score : int;
var P2score : int;

var P1text : GameObject;
var P2text : GameObject;

var panel : GameObject;

function Update () {
    var ray = GetComponent(Camera).ScreenPointToRay (Input.mousePosition);
    var hit : RaycastHit;
    if(Physics.Raycast (ray,hit,50) && Input.GetMouseButtonDown(0)) {
        if(hit.collider.tag == "Dot") {
            cube = Instantiate(Resources.Load("box"), hit.collider.gameObject.transform.position, Quaternion.Euler(0,90,0)) as GameObject;
            lay =  GameObject.FindGameObjectsWithTag ("Dot");
            for(var i = 0 ; i < lay.length ; i ++)
                lay[i].layer = 2;
        }
    }
    if(Physics.Raycast (ray,hit,50) && Input.GetMouseButton(0) && cube != example) {
        cube.transform.LookAt(hit.point);
        var x = (hit.point.x - cube.transform.position.x)*6.41;
        var y = (hit.point.y - cube.transform.position.y)*6.41;
        cube.transform.localScale.z = Mathf.Sqrt((x*x)+(y*y));
        cube.transform.localScale.z = Mathf.Clamp(cube.transform.localScale.z,0,6.2);
        cube.layer = 2;
        if(P1 == true) {
            cube.GetComponent(Renderer).material = red;
        }
        else if(P2 == true) {
            cube.GetComponent(Renderer).material = green;
        }
    }
    if(Input.GetMouseButtonUp(0) && cube != example) {
        if(cube.transform.localScale.z <3) {
            Destroy(cube);
        }
        lay2 =  GameObject.FindGameObjectsWithTag ("Dot");
        for(var a = 0 ; a < lay2.length ; a ++)
            lay2[a].layer = 0;
        if(cube.transform.localScale.z >3 && cube.GetComponent(Dest).alive == true) {
            cube.transform.eulerAngles.x = (Mathf.Round(cube.transform.eulerAngles.x/90))*90;
            cube.transform.localScale.z = 6.2;
            cube.layer = 0;
            P1 = !P1;
            P2 = !P2;
            cube.GetComponent(Dest).stop = true;
            cube = example;
            wait();
        }
    }
}


function wait() {
    yield 0;
    yield 0;
    yield 0;
    var P1scoretest : int;
    var P2scoretest : int;
    for (var b = 0; b < colours.Length; b++) {
        P1scoretest += colours[b].GetComponent(Score).P1win;
        P2scoretest += colours[b].GetComponent(Score).P2win;
    }
    if(P1score != P1scoretest) {
        P1score = P1scoretest;
        P1 = true;
        P2 = false;
        P1text.GetComponent(UI.Text).text = P1score.ToString();
    }
    if(P2score != P2scoretest) {
        P2score = P2scoretest;
        P2 = true;
        P1 = false;
        P2text.GetComponent(UI.Text).text = P2score.ToString();
    }
    if(P2score+P1score == 16) {
        panel.transform.localPosition.y = 0;
    }
}

function Retry() {
    Application.LoadLevel("Dots and Moduals");
}