"use strict";

var InventoryItemMouthPumpGagOptions = [
	{
		Name: "Empty",
		Property: {
			Type: null,
			InflateLevel: "0",
			Difficulty: 0,
			Effect: ["BlockMouth"],
		},
	},
	{
		Name: "Light",
		Property: {
			Type: "Light",
			InflateLevel: "1",
			Difficulty: 2,
			Effect: ["BlockMouth","GagLight"],
		},
	},
	{
		Name: "Inflated",
		Property: {
			Type: "Inflated",
			InflateLevel: "2",
			Difficulty: 4,
			Effect: ["BlockMouth","GagEasy"],
		},
	},
	{
		Name: "Bloated",
		Property: {
			Type: "Bloated",
			InflateLevel: "3",
			Difficulty: 6,
			Effect: ["BlockMouth","GagMedium"],
		},
	},
	{
		Name: "Maximum",
		Property: {
			Type: "Maximum",
			InflateLevel: "4",
			Difficulty: 8,
			Effect: ["BlockMouth","GagVeryHeavy"],
		},
	},
];

// Loads the item extension properties
function InventoryItemMouthPumpGagLoad() {
	ExtendedItemLoad(InventoryItemMouthPumpGagOptions, "SelectInflateLevel");
}

// Draw the item extension screen
function InventoryItemMouthPumpGagDraw() {
	ExtendedItemDraw(InventoryItemMouthPumpGagOptions, "InflateLevel", InventoryItemMouthPumpGagOptions.length, false);
}

// Catches the item extension clicks
function InventoryItemMouthPumpGagClick() {
	ExtendedItemClick(InventoryItemMouthPumpGagOptions, false, InventoryItemMouthPumpGagOptions.length, false);
}

/**
 * Publishes the message to the chat
 * @param {Character} C - The target character
 * @param {Option} Option - The currently selected Option
 * @param {Option} PreviousOption - The previously selected Option
 * @returns {void} - Nothing
 */
function InventoryItemMouthPumpGagPublishAction(C, Option, PreviousOption) {
	var NewIndex = InventoryItemMouthPumpGagOptions.indexOf(Option);
	var PreviousIndex = InventoryItemMouthPumpGagOptions.indexOf(PreviousOption);
	var msg = "PumpGag" + ((NewIndex > PreviousIndex) ? "pumps" : "deflates") + "To" + Option.Property.InflateLevel;
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
function InventoryItemMouthPumpGagNpcDialog(C, Option) {
	C.CurrentDialog = DialogFind(C, "InventoryItemMouthPumpGagNPCReaction" + Option.Name, "ItemMouth");
}



// Sets the pump gag level
function InventoryItemMouthPumpGagSetPump(Modifier) {

	// Loads the item
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	if (CurrentScreen == "ChatRoom") {
		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
		InventoryItemMouthPumpGagLoad();
	}

	// Sets the pump & gag level
	DialogFocusItem.Property.PumpLevel = DialogFocusItem.Property.PumpLevel + Modifier;
	if (DialogFocusItem.Property.PumpLevel == 0) DialogFocusItem.Property.Effect = ["BlockMouth"];
	if (DialogFocusItem.Property.PumpLevel == 1) DialogFocusItem.Property.Effect = ["BlockMouth", "GagLight"];
	if (DialogFocusItem.Property.PumpLevel == 2) DialogFocusItem.Property.Effect = ["BlockMouth", "GagEasy"];
	if (DialogFocusItem.Property.PumpLevel == 3) DialogFocusItem.Property.Effect = ["BlockMouth", "GagMedium"];
	if (DialogFocusItem.Property.PumpLevel == 4) DialogFocusItem.Property.Effect = ["BlockMouth", "GagVeryHeavy"];

	// The more it's pumped, the harder it becomes to struggle out of it
	if (DialogFocusItem.Property.PumpLevel == 0) delete DialogFocusItem.Property.Difficulty;
	if (DialogFocusItem.Property.PumpLevel >= 1) DialogFocusItem.Property.Difficulty = DialogFocusItem.Property.PumpLevel * 2;

	// Adds the lock effect back if it was padlocked
	if ((DialogFocusItem.Property.LockedBy != null) && (DialogFocusItem.Property.LockedBy != "")) {
		if (DialogFocusItem.Property.Effect == null) DialogFocusItem.Property.Effect = [];
		DialogFocusItem.Property.Effect.push("Lock");
	}

	// Reloads the character
	CharacterLoadEffect(C);
	if (C.ID == 0) ServerPlayerAppearanceSync();
	var Dictionary = [];
	Dictionary.push({Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
	Dictionary.push({Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber});
	ChatRoomPublishCustomAction("PumpGag" + ((Modifier > 0) ? "pumps" : "deflates") + "To" + DialogFocusItem.Property.PumpLevel, true, Dictionary);
}
