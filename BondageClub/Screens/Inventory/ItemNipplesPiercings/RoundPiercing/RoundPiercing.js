"use strict";
var InventoryItemNipplesPiercingsRoundPiercingMessage = "SelectPiercingState";
var InventoryItemNipplesPiercingsRoundPiercingPose = "RoundPiercingRestrain";

var InventoryItemNipplesPiercingsRoundPiercingOptions = [
	{
		Name: "Base",
		BondageLevel: 0,
		Property: {
			Type: null,
			Difficulty: 0,
		},
	},

	{
		Name: "Chain",
		BondageLevel: 0,
		Prerequisite: ["Collared"],
		Property: {
			Type: "Chain",
			Difficulty: 0,
		},
	},

	{
		Name: "Weighted",
		BondageLevel: 0,
		Property: {
			Type: "Weighted",
			Difficulty: 0,
		},
	},

	{
		Name: "WeightedChain",
		BondageLevel: 0,
		Prerequisite: ["Collared"],
		Property: {
			Type: "WeightedChain",
			Difficulty: 0,
		},
	},
]

/**
 * Loads the item extension properties
 * @returns {void} - Nothing
 */
function InventoryItemNipplesPiercingsRoundPiercingLoad() {
	ExtendedItemLoad(InventoryItemNipplesPiercingsRoundPiercingOptions, InventoryItemNipplesPiercingsRoundPiercingMessage);
}

/**
 * Draw the item extension screen
 * @returns {void} - Nothing
 */
function InventoryItemNipplesPiercingsRoundPiercingDraw() {
	ExtendedItemDraw(InventoryItemNipplesPiercingsRoundPiercingOptions, "RoundPiercingPose");
}

/**
 * Catches the item extension clicks
 * @returns {void} - Nothing
 */
function InventoryItemNipplesPiercingsRoundPiercingClick() {
	ExtendedItemClick(InventoryItemNipplesPiercingsRoundPiercingOptions, false);
}

/**
 * Publishes the message to the chat
 * @param {Character} C - The target character
 * @param {Option} Option - The currently selected Option
 * @param {Option} PreviousOption - The previously selected Option
 * @returns {void} - Nothing
 */
function InventoryItemNipplesPiercingsRoundPiercingPublishAction(C, Option, PreviousOption) {
	var NewIndex = InventoryItemNipplesPiercingsRoundPiercingOptions.indexOf(Option);
	var PreviousIndex = InventoryItemNipplesPiercingsRoundPiercingOptions.indexOf(PreviousOption);
	var msg = InventoryItemNipplesPiercingsRoundPiercingPose + Option.Name;
	// var ActionDialog = DialogFind(Player, NewIndex > PreviousIndex ? "tightens" : "loosens", "ItemArms");
	var Dictionary = [
		{ Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber },
		{ Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber },
		//{ Tag: "Action", Text: ActionDialog },
	];
	ChatRoomPublishCustomAction(msg, true, Dictionary);
}

function InventoryItemNipplesPiercingsRoundPiercingNpcDialog(C, Option) {
	C.CurrentDialog = DialogFind(C, "ItemNipplesPiercingsRoundPiercing" + Option.Name, "ItemNipplesPiercings");
}
