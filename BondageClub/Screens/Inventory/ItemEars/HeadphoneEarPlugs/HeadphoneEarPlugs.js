"use strict";

var InventoryItemEarsHeadphoneEarPlugsMessage = "";

var InventoryItemEarsHeadphoneEarPlugsOptions = [
	{
		Name: "Off",
		Property: {
			Type: null,
			Effect: [],
		},
	},
	{
		Name: "Light",
		Property: {
			Type: "Light",
			Effect: ["DeafLight"],
		},
	},
	{
		Name: "Heavy",
		Property: {
			Type: "Heavy",
			Effect: ["DeafHeavy"],
		},
	},
];

/**
 * Loads the item extension properties
 * @returns {void} - Nothing
 */
function InventoryItemEarsHeadphoneEarPlugsLoad() {
	ExtendedItemLoad(InventoryItemEarsHeadphoneEarPlugsOptions, "HeadphoneEarPlugsSelectLoudness");
}

/**
 *  Draw the item extension screen
 * @returns {void} - Nothing
 */
function InventoryItemEarsHeadphoneEarPlugsDraw() {
	ExtendedItemDraw(InventoryItemEarsHeadphoneEarPlugsOptions, "HeadphoneEarPlugsPose");
}


// Catches the item extension clicks
function InventoryItemEarsHeadphoneEarPlugsClick() {
	ExtendedItemClick(InventoryItemEarsHeadphoneEarPlugsOptions);
}

function InventoryItemEarsHeadphoneEarPlugsPublishAction(C, Option, PreviousOption) {
	var NewIndex = InventoryItemEarsHeadphoneEarPlugsOptions.indexOf(Option);
	var PreviousIndex = InventoryItemEarsHeadphoneEarPlugsOptions.indexOf(PreviousOption);
	var msg = "HeadphoneEarPlugsRestrain" + Option.Name;
	var Dictionary = [
		{ Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber },
		{ Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber },
		{ Tag: "AssetName", Text: DialogFocusItem.Asset.Description.toLowerCase() },
	];
	ChatRoomPublishCustomAction(msg, true, Dictionary);
}

function InventoryItemEarsHeadphoneEarPlugsNpcDialog(C, Option) {
	C.CurrentDialog = DialogFind(C, "ItemArmsHeadphoneEarPlugs" + Option.Name, "ItemEars");
}


// // Sets the cuffs pose (wrist, elbow, both or none)
// function InventoryItemEarsHeadphoneEarPlugsSetPose(NewPose) {

// 	// Gets the current item and character
// 	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
// 	if ((CurrentScreen == "ChatRoom") || (DialogFocusItem == null)) {
// 		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
// 		InventoryItemEarsHeadphoneEarPlugsLoad();
// 	} 

// 	// Sets the new pose with it's effects
// 	DialogFocusItem.Property.Restrain = NewPose;
// 	if (NewPose == null) {
// 		delete DialogFocusItem.Property.Effect;
// 		delete DialogFocusItem.Property.Type;
// 	} else {
// 		DialogFocusItem.Property.Effect = [""];
// 		DialogFocusItem.Property.Type = NewPose;
// 		if (NewPose == "Light") DialogFocusItem.Property.Effect = ["DeafLight"];
// 		if (NewPose == "Heavy") DialogFocusItem.Property.Effect = ["DeafHeavy"];
// 	}

// 	// Refreshes the character and chatroom
// 	CharacterRefresh(C);
// 	var msg = "HeadphoneEarPlugsRestrain" + ((NewPose == null) ? "None" : NewPose);
// 	var Dictionary = [];
// 	Dictionary.push({Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber});
// 	Dictionary.push({Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
// 	Dictionary.push({Tag: "AssetName", Text: DialogFocusItem.Asset.Description.toLowerCase()});
// 	ChatRoomPublishCustomAction(msg, true, Dictionary);

// 	// Rebuilds the inventory menu
// 	if (DialogInventory != null) {
// 		DialogFocusItem = null;
// 		DialogMenuButtonBuild(C);
// 	}

// }