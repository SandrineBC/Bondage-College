"use strict";

var InventoryItemArmsMermaidSuitOptions = [
	{
		Name: "Zipped",
		Property: {
			Type: null,
			Difficulty: 0,
			Block: ["ItemBreast", "ItemNipples", "ItemNipplesPiercings", "ItemVulva", "ItemVulvaPiercings", "ItemButt"],
		},
	},
	{
		Name: "UnZip",
		Property: {
			Type: "UnZip",
			Block: [],
		},
	},
];

/**
 * Loads the item extension properties
 * @returns {void} - Nothing
 */
function InventoryItemArmsMermaidSuitLoad() {
	ExtendedItemLoad(InventoryItemArmsMermaidSuitOptions, "MermaidSuitSelect");
}

/**
 * Draw the item extension screen
 * @returns {void} - Nothing
 */
function InventoryItemArmsMermaidSuitDraw() {
	ExtendedItemDraw(InventoryItemArmsMermaidSuitOptions, "MermaidSuitType");
}

// 	// Draw the item image and top controls
// 	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
// 	DrawRect(1387, 125, 225, 275, "white");
// 	DrawText(DialogFind(Player, "SelectSuitType"), 1500, 50, "white", "gray");
// 	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 127, 221, 221);
// 	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 375, 221, "black");

// 	// Draw the suits options
// 	DrawButton(1150, 440, 225, 225, "", (DialogFocusItem.Property.Type == null || DialogFocusItem.Property.Type == "Latex") ? "#888888" : "White");
// 	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Latex.png", 1150, 439);
// 	DrawText(DialogFind(Player, "MermaidSuitTypeZipped"), 1263, 425, "white", "gray");
// 	DrawButton(1600, 440, 225, 225, "", ((DialogFocusItem.Property.Type != null) && (DialogFocusItem.Property.Type == "UnZip")) ? "#888888" : "White");
// 	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/UnZip.png", 1600, 439);
// 	DrawText(DialogFind(Player, "MermaidSuitTypeUnZip"), 1713, 425, "white", "gray");

// }

/**
 * Catches the item extension clicks
 * @returns {void} - Nothing
 */
function InventoryItemArmsMermaidSuitClick() {
	ExtendedItemClick(InventoryItemArmsMermaidSuitOptions);
}

/**
 * Publishes the message to the chat
 * @param {Character} C - The target character
 * @param {Option} Option - The currently selected Option
 * @param {Option} PreviousOption - The previously selected Option
 * @returns {void} - Nothing
 */
function InventoryItemArmsMermaidSuitPublishAction(C, Option, PreviousOption) {
	var msg = "MermaidSuitSet" + Option.Name;
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
function InventoryItemNipplesPiercingsRoundPiercingNpcDialog(C, Option) {
	C.CurrentDialog = DialogFind(C, "RoundPiercingNPCReaction" + Option.Name, "ItemNipplesPiercings");
}


// // Sets the suit properties when it's model changes
// function InventoryItemArmsMermaidSuitSetType(NewType) {

// 	// Sets the type, blocking zones and wand
// 	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
// 	if ((CurrentScreen == "ChatRoom") || (DialogFocusItem == null)) {
// 		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
// 		InventoryItemArmsMermaidSuitLoad();
// 	}
// 	if (NewType == null || NewType == "UnZip") DialogFocusItem.Property.Type = NewType;
// 	if (NewType == null) DialogFocusItem.Property.Block = ["ItemBreast", "ItemNipples", "ItemNipplesPiercings", "ItemVulva", "ItemVulvaPiercings", "ItemButt"];
// 	else if (NewType == "UnZip") DialogFocusItem.Property.Block = [];
// 	CharacterRefresh(C);

// 	// Pushes the change to the chatroom
// 	var msg = "MermaidSuitSet" + ((NewType) ? NewType : "Zipped");
// 	var Dictionary = [];
// 	Dictionary.push({Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber});
// 	Dictionary.push({Tag: "TargetCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
// 	ChatRoomPublishCustomAction(msg, true, Dictionary);
// 	if (DialogInventory != null) {
// 		DialogFocusItem = null;
// 		DialogMenuButtonBuild(C);
// 	}

// }