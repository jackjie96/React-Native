export default class StringHelper
{
	static capitalizeFirstChar(string)
	{
		return (`${string.charAt(0).toUpperCase()}${string.slice(1)}`);
	}
}