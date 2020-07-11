"use strict";

// Returns the current value of an element
function ElementValue(ID, Value) {
	if (document.getElementById(ID) != null)
		if (Value == null)
			return document.getElementById(ID).value.trim();
		else
			document.getElementById(ID).value = Value;
}

// Returns the current HTML content of an element
function ElementContent(ID, Content) {
	if (document.getElementById(ID) != null)
		if (Content == null)
			return document.getElementById(ID).innerHTML;
		else
			document.getElementById(ID).innerHTML = Content;
}

function ElementCreateButton(ID, label, image, toolTip, func) {

	if (document.getElementById(ID) == null) {
		var button = document.createElement("button");
		button.className = "button";
		button.setAttribute("type", "button");
		button.setAttribute("ID", ID);
		button.setAttribute("Name", ID);
		if (image != "") button.style.backgroundImage = "url(" + DrawGetImage(image).src + ")";
		if (label != "") button.value = label;
		if (toolTip != "") button.after(toolTip);
		if (func != null) button.addEventListener("click", func);
		document.body.appendChild(button);
	}
}

// Creates a new text area element in the main document
function ElementCreateTextArea(ID) {
	if (document.getElementById(ID) == null) {
		var TextArea = document.createElement("TextArea");
		TextArea.setAttribute("ID", ID);
		TextArea.setAttribute("name", ID);
		TextArea.addEventListener("keydown", KeyDown);
		TextArea.className = "HideOnPopup";
		document.body.appendChild(TextArea);
	}
}

// Creates a new text input element in the main document
function ElementCreateInput(ID, Type, Value, MaxLength) {
	if (document.getElementById(ID) == null) {
		var Input = document.createElement("input");
		Input.setAttribute("ID", ID);
		Input.setAttribute("name", ID);
		Input.setAttribute("type", Type);
		Input.setAttribute("value", Value);
		Input.setAttribute("maxlength", MaxLength);
		Input.setAttribute("onfocus", "this.removeAttribute('readonly');");
		Input.addEventListener("keydown", KeyDown);
		Input.className = "HideOnPopup";
		document.body.appendChild(Input);
	}
}

// Creates a new div element in the main document
function ElementCreateDiv(ID) {
	if (document.getElementById(ID) == null) {
		var Div = document.createElement("div");
		Div.setAttribute("ID", ID);
		Div.setAttribute("name", ID);
		Div.addEventListener("keydown", KeyDown);
		Div.className = "HideOnPopup";
		document.body.appendChild(Div);
	}
}

// Removes an element from the main document
function ElementRemove(ID) {
	if (document.getElementById(ID) != null)
		document.getElementById(ID).parentNode.removeChild(document.getElementById(ID));
}

// Draw a regular HTML element at a specific position
function ElementPosition(ElementID, X, Y, W, H) {

	// Different positions based on the width/height ratio
	var Font;
	var Height;
	var Left;
	var Width;
	var Top;
	if (DrawScreenWidth <= DrawScreenHeight * 2) {
		Font = (DrawScreenWidth / 50);
		Height = H ? (H * DrawScreenWidth / 2000) : (Font * 1.15);
		Left = ((X - (W / 2)) * DrawScreenWidth / 2000);
		Width = (W * DrawScreenWidth / 2000) - 18;
		Top = (Y * DrawScreenWidth / 2000) + ((DrawScreenHeight * 2 - DrawScreenWidth) / 4) - (Height / 2);
	} else {
		Font = (DrawScreenHeight / 25);
		Height = H ? (H * DrawScreenHeight / 1000) : (Font * 1.15);
		Left = ((X - (W / 2)) * DrawScreenHeight / 1000) + (DrawScreenWidth - DrawScreenHeight * 2) / 2;
		Width = (W * DrawScreenHeight / 1000) - 18;
		Top = (Y * DrawScreenHeight / 1000) - (Height / 2);
	}

	// Sets the element style
	document.getElementById(ElementID).setAttribute("style", "font-size:" + Font + "px; font-family:Arial; position:absolute; padding-left:10px; left:" + Left + "px; top:" + Top + "px; width:" + Width + "px; height:" + Height + "px;");

}

// Draw a regular HTML element at a specific position
function ElementPositionFix(ElementID, Font, X, Y, W, H) {

	// Different positions based on the width/height ratio
	var Left;
	var Width;
	var Top;
	var Height;
	if (DrawScreenWidth <= DrawScreenHeight * 2) {
		Font = Font * DrawScreenWidth / 2000;
		Left = X * DrawScreenWidth / 2000;
		Width = W * DrawScreenWidth / 2000;
		Top = (Y * DrawScreenWidth / 2000) + ((DrawScreenHeight * 2 - DrawScreenWidth) / 4);
		Height = H * DrawScreenWidth / 2000;
	} else {
		Font = Font * DrawScreenHeight / 1000;
		Left = (X * DrawScreenHeight / 1000) + (DrawScreenWidth - DrawScreenHeight * 2) / 2;
		Width = W * DrawScreenHeight / 1000;
		Top = Y * DrawScreenHeight / 1000;
		Height = H * DrawScreenHeight / 1000;
	}

	// Sets the element style
	var E = document.getElementById(ElementID);
	Object.assign(E.style, {
		fontSize: Font + "px",
		fontFamily: "Arial",
		position: "absolute",
		left: Left + "px",
		top: Top + "px",
		width: Width + "px",
		height: Height + "px",
	});
}

// Sets a custom data-attribute to a specified value on a specified element
function ElementSetDataAttribute(ID, Name, Value) {
	var element = document.getElementById(ID);
	if (element != null) {
		element.setAttribute(("data-" + Name).toLowerCase(), Value.toString().toLowerCase());
	}
}

// Scrolls to the end of a specified element
function ElementScrollToEnd(ID) {
	var element = document.getElementById(ID);
	if (element != null) element.scrollTop = element.scrollHeight;
}

// Returns TRUE if the specified element is currently scrolled to the very bottom
function ElementIsScrolledToEnd(ID) {
	var element = document.getElementById(ID);
	if (element != null && element.scrollHeight - element.scrollTop - element.clientHeight < 1) return true;
	else return false;
}

// Sets focus to the specified element for regular users, not mobile
function ElementFocus(ID) {
	if ((document.getElementById(ID) != null) && !CommonIsMobile)
		document.getElementById(ID).focus();
}