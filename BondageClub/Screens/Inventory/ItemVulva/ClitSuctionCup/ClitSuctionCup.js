"use strict";

var InventoryItemVulvaClitSuctionCupOptions = [
	{
		Name: "Loose",
		Property: {
			Type: null,
			SuctionLevel: "0",
		},
	},
	{
		Name: "Light",
		Property: {
			Type: "Light",
			SuctionLevel: "1",
		},
	},	
	{
		Name: "Medium",
		Property: {
			Type: "Medium",
			SuctionLevel: "2",
		},
	},
	{
		Name: "Heavy",
		Property: {
			Type: "Heavy",
			SuctionLevel: "3",
		},
	},
	{
		Name: "Maximum",
		Property: {
			Type: "Maximum",
			SuctionLevel: "4",
		},
	},
];

// Loads the item extension properties
function InventoryItemVulvaClitSuctionCupLoad() {
	ExtendedItemLoad(InventoryItemVulvaClitSuctionCupOptions, "SelectSuctionLevel");
}

// Draw the item extension screen
function InventoryItemVulvaClitSuctionCupDraw() {
	ExtendedItemDraw(InventoryItemVulvaClitSuctionCupOptions, "SuctionLevel", InventoryItemVulvaClitSuctionCupOptions.length, false);
}	

// Catches the item extension clicks
function InventoryItemVulvaClitSuctionCupClick() {
	ExtendedItemClick(InventoryItemVulvaClitSuctionCupOptions, false, InventoryItemVulvaClitSuctionCupOptions.length, false);
};

function InventoryItemVulvaClitSuctionCupPublishAction(C, Option, PreviousOption) {
	var NewIndex = InventoryItemVulvaClitSuctionCupOptions.indexOf(Option);
	var PreviousIndex = InventoryItemVulvaClitSuctionCupOptions.indexOf(PreviousOption);
	var msg = "ClitSuc" + ((NewIndex > PreviousIndex) ? "tightens" : "loosens") + "To" + Option.Property.SuctionLevel;
	var Dictionary = [
		{ Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber },
		{ Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber },
	];
	ChatRoomPublishCustomAction(msg, true, Dictionary);
}

function ItemVulvaClitSuctionCupNpcDialog(C, Option) {
	C.CurrentDialog = DialogFind(C, "ItemVulvaClitSuctionCupNPCReaction" + Option.Name, "ItemVulva");
}
