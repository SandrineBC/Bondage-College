"use strict";
var MovieStudioBackground = "MovieStudio";
var MovieStudioDirectory = null;
var MovieStudioCurrentMovie = "";
var MovieStudioCurrentScene = "";
var MovieStudioCurrentRole = "";
var MovieStudioActor1 = null;
var MovieStudioActor2 = null;
var MovieStudioTimer = null;

/**
 * Loads the Movie Studio introduction room screen
 * @returns {void} - Nothing
 */
function MovieStudioLoad() {
	if (MovieStudioDirectory == null) {		
		MovieStudioDirectory = CharacterLoadNPC("NPC_MovieStudio_Director");
		InventoryWear(MovieStudioDirectory, "SunGlasses1", "Glasses");
		InventoryWear(MovieStudioDirectory, "AdmiralTop", "Cloth");
		InventoryWear(MovieStudioDirectory, "AdmiralSkirt", "ClothLower");
		MovieStudioDirectory.AllowItem = false;
	}
}

/**
 * Runs and draws the Movie Studio screen
 * @returns {void} - Nothing
 */
function MovieStudioRun() {
	if (MovieStudioCurrentMovie == "") {
		DrawCharacter(Player, 500, 0, 1);
		DrawCharacter(MovieStudioDirectory, 1000, 0, 1);
		if (Player.CanWalk()) DrawButton(1885, 25, 90, 90, "", "White", "Icons/Exit.png", TextGet("Leave"));
		DrawButton(1885, 145, 90, 90, "", "White", "Icons/Character.png", TextGet("Profile"));
	}
	if ((MovieStudioCurrentMovie == "Interview") && (MovieStudioCurrentScene == "1")) {
		DrawCharacter(MovieStudioActor1, 250, 0, 1);
		DrawCharacter(Player, 750, 0, 1);
		DrawCharacter(MovieStudioActor2, 1250, 0, 1);
		DrawText(TextGet("Recording"), 1900, 920, "#FF4444", "White");
		DrawText(TimermsToTime(CurrentTime - MovieStudioTimer), 1900, 960, "#FF4444", "White");
	}
}

/**
 * Handles clicks in the Movie Studio screen
 * @returns {void} - Nothing
 */
function MovieStudioClick() {
	if ((MovieStudioCurrentMovie == "") && MouseIn(500, 0, 500, 1000)) CharacterSetCurrent(Player);
	if ((MovieStudioCurrentMovie == "") && MouseIn(1000, 0, 500, 1000)) CharacterSetCurrent(MovieStudioDirectory);
	if ((MovieStudioCurrentMovie == "") && MouseIn(1885, 25, 90, 90) && Player.CanWalk()) CommonSetScreen("Room", "MainHall");
	if ((MovieStudioCurrentMovie == "") && MouseIn(1885, 145, 90, 90)) InformationSheetLoadCharacter(Player);
	if ((MovieStudioCurrentMovie == "Interview") && (MovieStudioCurrentScene == "1") && MouseIn(250, 0, 500, 1000)) CharacterSetCurrent(MovieStudioActor1);
	if ((MovieStudioCurrentMovie == "Interview") && (MovieStudioCurrentScene == "1") && MouseIn(1250, 0, 500, 1000)) CharacterSetCurrent(MovieStudioActor2);
}

/**
 * When the player needs to change clothes for a role in the movie
 * @param {string} Cloth - The clothes to wear
 * @returns {void} - Nothing
 */
function MovieStudioChange(Cloth) {
	if (Cloth == "Journalist") {
		CharacterNaked(Player);
		InventoryWear(Player, "TeacherOutfit1", "Cloth", "Default");
		InventoryWear(Player, "Glasses1", "Glasses", "#333333");
		InventoryWear(Player, "Socks5", "Socks", "#444458");
		InventoryWear(Player, "Shoes2", "Shoes", "#111111");
	}
}

/**
 * When the movie scene progresses, we assign the new values
 * @param {string} Movie - The movie type
 * @param {string} Scene - The scene in the movie
 * @param {string} Role - Optional - The role the player is taking
 * @returns {void} - Nothing
 */
function MovieStudioProgress(Movie, Scene, Role) {
	MovieStudioTimer = CurrentTime;
	MovieStudioCurrentMovie = Movie;
	MovieStudioCurrentScene = Scene;
	if (Role != "") MovieStudioCurrentRole = Role;
	if ((Movie == "Interview") && (Scene == "1")) {
		MovieStudioBackground = CommonRandomItemFromList("", ["BDSMRoomRed", "BDSMRoomBlue", "BDSMRoomPurple"]);
		MovieStudioActor1 = CharacterLoadNPC("NPC_MovieStudio_Interview_Drawer");
		MovieStudioActor1.FixedImage = "Screens/Room/MovieStudio/Drawer.png";
		MovieStudioActor2 = CharacterLoadNPC("NPC_MovieStudio_Interview_XCross");
		MovieStudioActor2.FixedImage = "Screens/Room/MovieStudio/XCross.png";
	}
	if (CurrentCharacter != null) DialogLeave();
}