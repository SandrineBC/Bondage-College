"use strict";

var InventoryItemArmsLeatherCuffsOptions = [
	{
		Name: "None",
		Property: {
			Type: null,
			Difficulty: 0,
			Effect: [],
			SetPose: null,
			SelfUnlock: true,
		},
	},
	{
		Name: "Wrist",
		Property: {
			Type: "Wrist",
			Difficulty: 2,
			Effect: ["Block", "Prone"],
			SetPose: ["BackBoxTie"],
			SelfUnlock: true,
		},
	},
	{
		Name: "Elbow",
		Property: {
			Type: "Elbow",
			Difficulty: 4,
			Effect: ["Block", "Prone"],
			SetPose: ["BackElbowTouch"],
			SelfUnlock: false,
		},
	},
	{
		Name: "Both",
		Property: {
			Type: "Both",
			Difficulty: 6,
			Effect: ["Block", "Prone"],
			SetPose: ["BackElbowTouch"],
			SelfUnlock: false,
		},
	}
]

/**
 * Loads the item extension properties
 * @returns {void} - Nothing
 */
function InventoryItemArmsLeatherCuffsLoad() {
	ExtendedItemLoad(InventoryItemArmsLeatherCuffsOptions, "SelectBondagePosition");
}

/**
 * Draw the item extension screen
 * @returns {void} - Nothing
 */
function InventoryItemArmsLeatherCuffsDraw() {
	ExtendedItemDraw(InventoryItemArmsLeatherCuffsOptions, "LeatherCuffsPose");
}
	
// Catches the item extension clicks
function InventoryItemArmsLeatherCuffsClick() {
	ExtendedItemClick(InventoryItemArmsLeatherCuffsOptions);
}

function InventoryItemArmsLeatherCuffsPublishAction(C, Option, PreviousOption) {
	var msg = "LeatherCuffsRestrain" + Option.Name;
	var Dictionary = [
		{ Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber },
		{ Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber },
	];
	ChatRoomPublishCustomAction(msg, true, Dictionary);
}

function InventoryItemArmsLeatherCuffsNpcDialog(C, Option) {
	C.CurrentDialog = DialogFind(C, "ItemArmsLeatherCuffs" + Option.Name, "ItemArms");
}


// // Sets the cuffs pose (wrist, elbow, both or none)
// function InventoryItemArmsLeatherCuffsSetPose(NewPose) {

// 	// Gets the current item and character
// 	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
// 	if (CurrentScreen == "ChatRoom") {
// 		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
// 		InventoryItemArmsLeatherCuffsLoad();
// 	}

// 	// Sets the new pose with it's effects
// 	DialogFocusItem.Property.Restrain = NewPose;
// 	if (NewPose == null) {
// 		delete DialogFocusItem.Property.SetPose;
// 		delete DialogFocusItem.Property.Effect;
// 		delete DialogFocusItem.Property.SelfUnlock;
// 		delete DialogFocusItem.Property.Difficulty;
// 	} else {
// 		DialogFocusItem.Property.SetPose = [(NewPose == "Wrist") ? "BackBoxTie" : "BackElbowTouch"];
// 		DialogFocusItem.Property.Effect = ["Block", "Prone"];
// 		DialogFocusItem.Property.SelfUnlock = (NewPose == "Wrist");
// 		if (NewPose == "Wrist") DialogFocusItem.Property.Difficulty = 2;
// 		if (NewPose == "Elbow") DialogFocusItem.Property.Difficulty = 4;
// 		if (NewPose == "Both") DialogFocusItem.Property.Difficulty = 6;
// 	}

// 	// Adds the lock effect back if it was padlocked
// 	if ((DialogFocusItem.Property.LockedBy != null) && (DialogFocusItem.Property.LockedBy != "")) {
// 		if (DialogFocusItem.Property.Effect == null) DialogFocusItem.Property.Effect = [];
// 		DialogFocusItem.Property.Effect.push("Lock");
// 	}

// 	// Refreshes the character and chatroom
// 	CharacterRefresh(C);
// 	var msg = "LeatherCuffsRestrain" + ((NewPose == null) ? "None" : NewPose);
// 	var Dictionary = [];
// 	Dictionary.push({Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber});
// 	Dictionary.push({Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
// 	ChatRoomPublishCustomAction(msg, true, Dictionary);

// 	// Rebuilds the inventory menu
// 	if (DialogInventory != null) {
// 		DialogFocusItem = null;
// 		DialogMenuButtonBuild(C);
// 	}

// }