// test sur
let elements = document.getElementsByClassName("title");
console.log(elements);
if (elements && elements.length && elements[0]) {
	for (let i = 0; i < elements.length; i++) {
		//elements[i].innerHTML = "HAHA";
		elements[i].style.fontFamily = "Comic Sans MS";
	}
}
