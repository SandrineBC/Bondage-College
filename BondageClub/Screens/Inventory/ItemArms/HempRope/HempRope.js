"use strict";

const InventoryItemArmsHempRopeOptions = [
	{
		Name: "BoxTie",
		RequiredBondageLevel: null,
		Property: { Type: null, Effect: ["Block", "Prone"], SetPose: ["BackBoxTie"], Difficulty: 1 }
	}, {
		Name: "WristTie",
		RequiredBondageLevel: null,
		Property: { Type: "WristTie", Effect: ["Block", "Prone"], SetPose: ["BackBoxTie"], Difficulty: 1 },
		Expression: [{ Group: "Blush", Name: "Low", Timer: 5 }]
	}, {
		Name: "CrossedBoxtie",
		RequiredBondageLevel: null,
		Property: { Type: "CrossedBoxtie", Effect: ["Block", "Prone"], SetPose: ["BackBoxTie"], Difficulty: 1 },
		Expression: [{ Group: "Blush", Name: "Low", Timer: 5 }]
	}, {
		Name: "RopeCuffs",
		RequiredBondageLevel: null,
		Property: { Type: "RopeCuffs", Effect: ["Block", "Prone"], SetPose: ["BackCuffs"], Difficulty: 1, OverridePriority: 29 },
		Expression: [{ Group: "Blush", Name: "Low", Timer: 5 }]
	}, {
		Name: "WristElbowTie",
		RequiredBondageLevel: 2,
		Property: { Type: "WristElbowTie", Effect: ["Block", "Prone"], SetPose: ["BackElbowTouch"], Difficulty: 2 },
		Expression: [{ Group: "Blush", Name: "Medium", Timer: 5 }]
	}, {
		Name: "SimpleHogtie",
		qRequiredBondageLevel: 2,
		Property: { Type: "SimpleHogtie", Effect: ["Block", "Prone"], SetPose: ["Hogtied"], Difficulty: 2 },
		Expression: [{ Group: "Blush", Name: "Medium", Timer: 5 }]
	}, {
		Name: "TightBoxtie",
		RequiredBondageLevel: 3,
		Property: { Type: "TightBoxtie", Effect: ["Block", "Prone"], SetPose: ["BackBoxTie"], Difficulty: 3 },
		Expression: [{ Group: "Blush", Name: "Medium", Timer: 5 }]
	}, {
		Name: "WristElbowHarnessTie",
		RequiredBondageLevel: 3,
		Property: { Type: "WristElbowHarnessTie", Effect: ["Block", "Prone"], SetPose: ["BackElbowTouch"], Difficulty: 3 },
		Expression: [{ Group: "Blush", Name: "Medium", Timer: 5 }]
	}, {
		Name: "KneelingHogtie",
		RequiredBondageLevel: 4,
		Prerequisite: ["NotMounted", "NotSuspended"],
		Property: { Type: "KneelingHogtie", Effect: ["Block", "Freeze", "Prone"], Block: ["ItemHands", "ItemLegs", "ItemFeet", "ItemBoots", "ItemDevices"], SetPose: ["Kneel", "BackElbowTouch"], Difficulty: 3 },
		Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }]
	}, {
		Name: "Hogtied",
		RequiredBondageLevel: 4,
		Prerequisite: ["NotMounted", "NotSuspended", "CannotBeHogtiedWithAlphaHood"],
		Property: { Type: "Hogtied", Effect: ["Block", "Freeze", "Prone"], Block: ["ItemHands", "ItemLegs", "ItemFeet", "ItemBoots", "ItemDevices"], SetPose: ["Hogtied"], Difficulty: 3 },
		Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }]
	}, {
		Name: "AllFours",
		RequiredBondageLevel: 6,
		Prerequisite: ["NotMounted", "NotSuspended", "CannotBeHogtiedWithAlphaHood"],
		Property: { Type: "AllFours", Effect: ["ForceKneel"], Block: ["ItemLegs", "ItemFeet", "ItemBoots", "ItemDevices"], SetPose: ["AllFours"], Difficulty: 3 },
		Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }]
	}, {
		Name: "SuspensionHogtied",
		RequiredBondageLevel: 8,
		Prerequisite: ["NotMounted", "NotChained", "NotSuspended", "CannotBeHogtiedWithAlphaHood"],
		Property: { Type: "SuspensionHogtied", Effect: ["Block", "Freeze", "Prone"], Block: ["ItemHands", "ItemLegs", "ItemFeet", "ItemBoots"], SetPose: ["Hogtied", "SuspensionHogtied"], Difficulty: 6 },
		Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
		HiddenItem: "SuspensionHempRope"
	}
];

// Loads the item extension properties
function InventoryItemArmsHempRopeLoad() {
	ExtendedItemLoad(InventoryItemArmsHempRopeOptions, "SelectRopeBondage")
}

// Draw the item extension screen
function InventoryItemArmsHempRopeDraw() {
	ExtendedItemDraw(InventoryItemArmsHempRopeOptions, "RopeBondage");
}

// Catches the item extension clicks
function InventoryItemArmsHempRopeClick() {
	ExtendedItemClick(InventoryItemArmsHempRopeOptions);
}

function InventoryItemArmsHempRopePublishAction(C, Option, PreviousOption) {
	var msg = "ArmsRopeSet" + Option.Name;
	var Dictionary = [
		{ Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber },
		{ Tag: "TargetCharacter", Text: C.Name, MemberNumber: C.MemberNumber },
	];
	ChatRoomPublishCustomAction(msg, true, Dictionary);
}

function InventoryItemArmsHempRopeNPCDialog(C, Option) {
	C.CurrentDialog = DialogFind(C, "RopeBondage" + Option.Name, "ItemArms");
}

// Validates the selected option
// function InventoryItemArmsHempRopeValidate(Option) {

// 	
// 	if (NewType.Prerequisite != null && !InventoryAllow(C, NewType.Prerequisite, true)) { DialogExtendedMessage = DialogText; return; }

// 	// Sets the new pose with its effects and the hidden items if we need to
// 	DialogFocusItem.Property = NewType.Property;
// 	if (NewType.HiddenItem != null) InventoryWear(C, NewType.HiddenItem, "ItemHidden", DialogFocusItem.Color);
// 	else InventoryRemove(C, "ItemHidden");
// 	CharacterRefresh(C);
// 	ChatRoomCharacterUpdate(C);

// 	// Sets the chatroom or NPC message
// 	if (CurrentScreen == "ChatRoom") {
// 		var msg = "ArmsRopeSet" + NewType.Name;
// 		var Dictionary = [];
// 		Dictionary.push({Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber});
// 		Dictionary.push({Tag: "TargetCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
// 		ChatRoomPublishCustomAction(msg, true, Dictionary);
// 	} else {
// 		DialogFocusItem = null;
// 		if (C.ID == 0) DialogMenuButtonBuild(C);
// 		else {
// 			C.CurrentDialog = DialogFind(C, "RopeBondage" + NewType.Name, "ItemArms");
// 			C.FocusGroup = null;
// 		}
// 	}
