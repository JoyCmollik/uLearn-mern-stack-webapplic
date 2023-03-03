const { voteTopic, unVoteTopic } = require('./voteUnvoteTopic');
const { addComment, removeComment } = require('./commentActions');

module.exports = {
	voteTopic,
	unVoteTopic,
	addComment,
	removeComment,
};
