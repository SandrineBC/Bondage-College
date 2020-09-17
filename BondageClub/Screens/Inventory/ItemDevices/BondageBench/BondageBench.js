"use strict";

var InventoryItemDevicesBondageBenchOptions = [
	{
		Name: "None",
		Property: {
			Type: null,
			Difficulty: 0,
			SetPose: ["LegsClosed"],
			Effect: ["Mounted"],
		},
	},
	{
		Name: "Light",
		Property: {
			Type: "Light",
			Difficulty: 2,
			SelfBondage: 2,
			AllowLock: true,
			SetPose: ["LegsClosed", "BaseUpper"],
			Effect: ["Block", "Prone", "Freeze", "Mounted"],
			Prerequisite: ["NoOuterClothes"],
			Hide: ["HairBack", "Wings", "TailStraps", "ItemButt"],
		},
	},
	{
		Name: "Normal",
		Property: {
			Type: "Normal",
			Difficulty: 3,
			SelfBondage: 3,
			AllowLock: true,
			SetPose: ["LegsClosed", "BaseUpper"],
			Effect: ["Block", "Prone", "Freeze", "Mounted"],
			Prerequisite: ["NoOuterClothes"],
			Hide: ["HairBack", "Wings", "TailStraps", "ItemButt"],
		},
	},
	{
		Name: "Heavy",
		Property: {
			Type: "Heavy",
			Difficulty: 6,
			SelfBondage: 6,
			AllowLock: true,
			SetPose: ["LegsClosed", "BaseUpper"],
			Effect: ["Block", "Prone", "Freeze", "Mounted"],
			Prerequisite: ["NoOuterClothes"],
			Hide: ["HairBack", "Wings", "TailStraps", "ItemButt"],
		},
	},
	{
		Name: "Full",
		Property: {
			Type: "Full",
			Difficulty: 9,
			SelfBondage: 9,
			AllowLock: true,
			SetPose: ["LegsClosed", "BaseUpper"],
			Effect: ["Block", "Prone", "Freeze", "Mounted"],
			Prerequisite: ["NoOuterClothes"],
			Hide: ["HairBack", "Wings", "TailStraps", "ItemButt"],
		},
	},
];

// Loads the item extension properties
function InventoryItemDevicesBondageBenchLoad() {
	ExtendedItemLoad(InventoryItemDevicesBondageBenchOptions, "BondageBenchStrapsSelectTightness");
}

// Draw the item extension screen
function InventoryItemDevicesBondageBenchDraw() {
	ExtendedItemDraw(InventoryItemDevicesBondageBenchOptions, "BondageBenchStrapsPose");
}

// Catches the item extension clicks
function InventoryItemDevicesBondageBenchClick() {
	ExtendedItemClick(InventoryItemDevicesBondageBenchOptions);
}

/**
 * Publishes the message to the chat
 * @param {Character} C - The target character
 * @param {Option} Option - The currently selected Option
 * @param {Option} PreviousOption - The previously selected Option
 * @returns {void} - Nothing
 */
function InventoryItemDevicesBondageBenchPublishAction(C, Option, PreviousOption) {
	var msg = "BondageBenchStrapsRestrain" + ((!Option.Property.Type) ? "None" : Option.Property.Type);
	var Dictionary = [
		{ Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber },
		{ Tag: "TargetCharacter", Text: C.Name, MemberNumber: C.MemberNumber },
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
function InventoryItemDevicesBondageBenchPNpcDialog(C, Option) {
	C.CurrentDialog = DialogFind(C, "InventoryItemDevicesBondageBenchNPCReaction" + Option.Name, "ItemDevices");
}


// // Sets the cuffs pose (wrist, elbow, both or none)
// function InventoryItemDevicesBondageBenchSetPose(NewPose) {

// 	// Gets the current item and character
// 	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
// 	if ((CurrentScreen == "ChatRoom") || (DialogFocusItem == null)) {
// 		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
// 		InventoryItemDevicesBondageBenchLoad();
// 	}

// 	var BondageBenchStraps = InventoryItemCreate(C, "ItemAddon", "BondageBenchStraps");

// 	// Do not continue if the item is blocked
// 	if (InventoryIsPermissionBlocked(C, "BondageBenchStraps", "ItemAddon") || !InventoryCheckLimitedPermission(C, BondageBenchStraps)) return;

// 	// Cannot be used with clothes or other addons
// 	if ((InventoryGet(C, "Cloth") != null) || (InventoryGet(C, "ClothLower") != null)) return;
// 	if (InventoryGet(C, "ItemAddon") != null) return;

// 	// Adds the strap and focus on it
// 	if (NewPose == "StrapUp") {
// 		InventoryWear(C, "BondageBenchStraps", "ItemAddon", DialogColorSelect);
// 		DialogFocusItem = InventoryGet(C, "ItemAddon");
// 	}

// 	// Refreshes the character and chatroom
// 	CharacterRefresh(C);
// 	var msg = "BondageBenchRestrain" + ((NewPose == null) ? "None" : NewPose);
// 	var Dictionary = [];
// 	Dictionary.push({Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber});
// 	Dictionary.push({Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
// 	Dictionary.push({Tag: "TargetCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
// 	ChatRoomPublishCustomAction(msg, true, Dictionary);
// 	ChatRoomCharacterItemUpdate(C, "ItemAddon");

// 	// Rebuilds the inventory menu
// 	if (DialogInventory != null) {
// 		DialogFocusItem = null;
// 		DialogMenuButtonBuild(C);
// 	}

// }
