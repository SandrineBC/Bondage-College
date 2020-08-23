"use strict";
// Loads the item extension properties
function InventoryItemNeckAccessoriesCustomCollarTagLoad() {
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = {};
	if (DialogFocusItem.Property.Color == null) DialogFocusItem.Property.Color = "#000000";
	if (DialogFocusItem.Property.Text == null) DialogFocusItem.Property.Text = "Tag";

	// Only create the inputs if the item isn't locked
	if (!InventoryItemHasEffect(DialogFocusItem, "Lock", true)) {
		ElementCreateInput("Color", "text", DialogFocusItem.Property.Color, "7");
		ElementCreateInput("TagText", "text", DialogFocusItem.Property.Text, "9");
	}
}

// Draw the extension screen
function InventoryItemNeckAccessoriesCustomCollarTagDraw() {
	// Draw the header and item
	DrawRect(1387, 125, 225, 275, "white");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 127, 221, 221);
    DrawTextFit(DialogFocusItem.Asset.Description, 1500, 375, 221, "black");
    
    // Tag data
	if (!InventoryItemHasEffect(DialogFocusItem, "Lock", true)) {
		ElementPosition("Color", 1375, 600, 250);
		ElementPosition("TagText", 1375, 680, 250);
		DrawButton(1500, 571, 350, 64, DialogFind(Player, "CustomTagColor"), CommonIsColor(ElementValue("Color")) ? "White" : "#888", "");
		DrawButton(1500, 651, 350, 64, DialogFind(Player, "CustomTagText"), "White", "");
		DrawButton(1350, 731, 350, 64, DialogFind(Player, "CustomTagBoth"), CommonIsColor(ElementValue("Color")) ? "White" : "#888", "");
	} else {
		DrawText(DialogFind(Player, "SelectCollarNameTagTypeLocked"), 1500, 500, "white", "gray");
    }
}

// Catches the item extension clicks
function InventoryItemNeckAccessoriesCustomCollarTagClick() {
	
	if (!InventoryItemHasEffect(DialogFocusItem, "Lock", true)) {
		if ((MouseX >= 1500) && (MouseX <= 1850)) {
			// Changes the color
			if ((MouseY >= 571) && (MouseY <= 635) && CommonIsColor(ElementValue("Color"))) {
				DialogFocusItem.Property.Color = ElementValue("Color");
				InventoryItemNeckAccessoriesCustomCollarTagChange();
			}

			// Changes the text
			if ((MouseY >= 671) && (MouseY <= 735)) {
				DialogFocusItem.Property.Text = ElementValue("TagText");
				InventoryItemNeckAccessoriesCustomCollarTagChange();
			}
		}

		// Changes both
		if (MouseIn(1350, 731, 350, 64) && CommonIsColor(ElementValue("Color"))) {
			DialogFocusItem.Property.Text = ElementValue("TagText");
			DialogFocusItem.Property.Color = ElementValue("Color");
			InventoryItemNeckAccessoriesCustomCollarTagChange();
		}
	}
	// Exits the screen
	if (MouseIn(1885, 25, 90, 90)) {
		InventoryItemNeckAccessoriesCustomCollarTagExit();
	}
}

// Leaves the extended screen
function InventoryItemNeckAccessoriesCustomCollarTagExit() {
	ElementRemove("Color");
	ElementRemove("TagText");
	PreferenceMessage = "";
	DialogFocusItem = null;
	if (DialogInventory != null) DialogMenuButtonBuild((Player.FocusGroup != null) ? Player : CurrentCharacter);
}

// When the tag is changed
function InventoryItemNeckAccessoriesCustomCollarTagChange() { 
    var C = CharacterGetCurrent();
    CharacterRefresh(C);
    if (CurrentScreen == "ChatRoom") {
        var Dictionary = [];
        Dictionary.push({ Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber });
        Dictionary.push({ Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber });
        ChatRoomPublishCustomAction("ChangeCustomTag", true, Dictionary);
		InventoryItemNeckAccessoriesCustomCollarTagExit();
    }
}

// Drawing function for the text on the tag
function AssetsItemNeckAccessoriesCustomCollarTagAfterDraw({
    C, A, X, Y, Property, drawCanvas, drawCanvasBlink
}) { 
    
    // We set up a canvas
    let TempCanvas = document.createElement("canvas"); 
    TempCanvas.setAttribute('name', AnimationGetDynamicDataName(C, AnimationDataTypes.Canvas, A));
    TempCanvas.width = 45;
    TempCanvas.height = 50;
    
    // We draw the desired info on that canvas
    let context = TempCanvas.getContext('2d');
	context.font = "14px serif";
    context.fillStyle = (Property ? Property.Color : null) || "#000000";
    context.textAlign = "center";
    context.fillText((Property ? Property.Text : ""), 22.5, 22.5, 45);
    
    // We print the canvas to the character based on the asset position
    drawCanvas(TempCanvas, X + 227.5, Y + 30);
    drawCanvasBlink(TempCanvas, X + 227.5, Y + 30);
}