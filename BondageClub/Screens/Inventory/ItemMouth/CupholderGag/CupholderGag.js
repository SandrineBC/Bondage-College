"use strict";

const InventoryItemMouthCupholderGagOptions = [
	{
		Name: "RemoveCup",
		Property: {
			Type: "RemoveCup",
		},
	},
	{
		Name: "TipOverCup",
		Property: {
			Type: "TipOverCup",
		},
	},
	{
		Name: "PlaceCup",
		Property: {
			Type: "Cup",
		},
	},
];

/**
 * Loads the item extension properties. Does nothing but propagate the call to the extended items
 * @returns {void} - Nothing
 */
function InventoryItemMouthCupholderGagLoad() {
	ExtendedItemLoad(InventoryItemMouthCupholderGagOptions, "CupholderGagOptions");
}

/**
 * Draw the item extension screen. Does nothing but propagate the call to the extended items
 * @returns {void} - Nothing
 */
function InventoryItemMouthCupholderGagDraw() {
	ExtendedItemDraw(InventoryItemMouthCupholderGagOptions, "CupholderGag", InventoryItemMouthCupholderGagOptions.length, false);
}

/**
 * Catches the item extension clicks. Does nothing but propagate the call to the extended items
 * @returns {void} - Nothing
 */
function InventoryItemMouthCupholderGagClick() {
	ExtendedItemClick(InventoryItemMouthCupholderGagOptions, false, InventoryItemMouthCupholderGagOptions.length, false);
}

/**
 * Publishes the action to the chat room
 * @param {Character} C - The character who get restrained
 * @param {Option} Option - The extended item option
 * @param {string} Option.Name - The name of the option. Used for finding the right dialog entry
 * @param {Option} PreviousOption - The extended item option that was previously used. Not used in this item
 * @returns {void} - Nothing
 */
function InventoryItemMouthCupholderGagPublishAction(C, Option) {
	var msg = "CupholderGagSet" + Option.Name;
	var Dictionary = [
		{ Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber },
		{ Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber },
	];
	ChatRoomPublishCustomAction(msg, true, Dictionary);
}

/**
 * The NPC dialog is for what the NPC says to you when you make a change to their restraints - the dialog lookup is on a 
 * per-NPC basis. You basically put the "AssetName" + OptionName in there to allow individual NPCs to override their default 
 * "GroupName" dialog if for example we ever wanted an NPC to react specifically to having the restraint put on them. 
 * That could be done by adding an "AssetName" entry (or entries) to that NPC's dialog CSV
 * @param {Character} C - The NPC to whom the restraint is applied
 * @param {Option} Option - The chosen option for this extended item
 * @returns {void} - Nothing
 */
function InventoryItemMouthCupholderGagNpcDialog(C, Option) {
	C.CurrentDialog = DialogFind(C, "InventoryItemMouthCupholderGag" + Option.Name, "ItemMouth");
}

/**
 * Validate function that checks, if the restrained character wears outer clothes. If so, the duct tape cannot be applied
 * @param {Character} C - The character wearing the item
 * @param {Option} Option - The option to be applied on the character. Not used in this item
 * @returns {boolean} - Returns false and sets DialogExtendedMessage, if the chosen option is not possible.
 */
function InventoryItemMouthCupholderGagValidate(C, Option) {
	var Allowed = "";

	console.log(Option.Name);

	switch (Option.Name) {
		case "RemoveCup":
		case "TipOverCup":
			if (!Option.Property.Type === "Cup") Allowed = "No cup present";
			break;
		case "PlaceCup":
			if (Option.Property.Type === "Cup") Allowed = "Cup already present";
			break;
	}// switch

	return Allowed;
}


/*
// Draw the item extension screen
function InventoryItemMouthCupholderGagDraw() {

	// Draw the header and item
	DrawRect(1387, 125, 225, 275, "white");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 127, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 375, 221, "black");
	
	DrawText(DialogFind(Player, "CupholderGagOptions"), 1500, 500, "white", "gray");
	DrawButton(1200, 650, 200, 55, DialogFind(Player, "CupholderGagTipOverCup"), DialogFocusItem.Property.Type == "Cup" ? "White" : "#888888");
	DrawButton(1550, 650, 200, 55, DialogFind(Player, "CupholderGagRemoveCup"), Player.CanInteract() && DialogFocusItem.Property.Type == "Cup" ? "White" : "#888888");
	DrawButton(1375, 710, 200, 55, DialogFind(Player, "CupholderGagPlaceCup"), Player.CanInteract() && !DialogFocusItem.Property.Type ? "White" : "#888888");

}
*/

/* // Catches the item extension clicks
function InventoryItemMouthCupholderGagClick() {
	if ((MouseX >= 1885) && (MouseX <= 1975) && (MouseY >= 25) && (MouseY <= 110)) DialogFocusItem = null;
	if ((MouseX >= 1325) && (MouseX <= 1389) && (MouseY >= 800) && (MouseY <= 864) && (CurrentScreen == "ChatRoom")) {
		DialogFocusItem.Property.ShowText = !DialogFocusItem.Property.ShowText;
		DialogLeave();
	}
	
	// Click mode depending on who interacts
	if ((MouseX >= 1200) && (MouseX <= 1400) && (MouseY >= 650) && (MouseY <= 705) && (DialogFocusItem.Property.Type == "Cup")) InventoryItemMouthCupholderGagSetType("Tip");
	if ((MouseX >= 1550) && (MouseX <= 1750) && (MouseY >= 650) && (MouseY <= 705) && (Player.CanInteract() && DialogFocusItem.Property.Type == "Cup")) InventoryItemMouthCupholderGagSetType("");
	if ((MouseX >= 1375) && (MouseX <= 1575) && (MouseY >= 710) && (MouseY <= 765) && (Player.CanInteract() && !DialogFocusItem.Property.Type)) InventoryItemMouthCupholderGagSetType("Cup");

}
 */
// Sets the gag type (small, cleave, otm, otn)
function InventoryItemMouthCupholderGagSetType(NewType) {
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	if (CurrentScreen == "ChatRoom") {
		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
		InventoryItemMouthCupholderGagLoad();
	}
	
	DialogFocusItem.Property.Type = NewType != "Tip" ? NewType : "";

	// Refreshes the character and chatroom
	CharacterRefresh(C);
	var msg = "CupholderGagSet" + ((NewType) ? NewType : "NoCup");
	var Dictionary = [];
	Dictionary.push({ Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber });
	Dictionary.push({ Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber });
	ChatRoomPublishCustomAction(msg, true, Dictionary);
	if (DialogInventory != null) {
		DialogFocusItem = null;
		DialogMenuButtonBuild(C);
	}
}
