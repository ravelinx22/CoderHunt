Slingshot.fileRestrictions("projectPhotos", {
	allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
	maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited).
});

Slingshot.createDirective("projectPhotos", Slingshot.S3Storage, {
	bucket: "coderhunt",

	acl: "public-read",

	authorize: function () {
		if (!this.userId) {
			var message = "Please login before posting files";
			throw new Meteor.Error("Login Required", message);
		}

		return true;
	},

	key: function (file) {
		return this.userId + "/" + file.name;
	}
});
