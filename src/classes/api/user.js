class User{
	constructor(data){
		this.username = data.display_name;
		this.uri = data.uri;
		this.id = data.id;
		this.followers = data.followers.total;
		this.images = [...data.images];
	}
}

module.exports = User;
