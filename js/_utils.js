//Util Functions
function getWinningCombo(n){
		var max = 8;
		var min = 0;
		var hBoard = [[0,1,2],[3,4,5],[6,7,8]];
		var vBoard = [[0,3,6],[1,4,7],[2,5,8]]
		var dBoard = [[0,4,8], [2,4,6]];
		var hCombo = [];
		var vCombo = [];	
		var dCombo = [];	
		var x = n;

		for (var i=0; i<3; i++){
			if (hBoard[i].indexOf(x) > -1)
			{
				hCombo = hBoard[i];
				break;
			}
		}

		for (var i=0; i<3; i++){
			if (vBoard[i].indexOf(x) > -1)
			{
				vCombo = vBoard[i];
				break;
			}
		}

		for (var i=0; i<2; i++){
			if (dBoard[i].indexOf(x) > -1)
			{
				dCombo = dBoard[i];
				break;
			}
		}
		
		return [hCombo, vCombo, dCombo];
	}

	function isEmpty(obj){
		if (obj === '' || obj === undefined || obj === null)
			return true;
		else return false;
	}

	function isEqualContent(obj){
		if (isEmpty(obj)) return false;
		for(var i = 0; i < obj.length; i++)
    {    	
    	if (isEmpty(obj[i])) return false;
        if(obj[i] !== obj[0])
            return false;
    }
    return true;

	}

	function sameValuesInArr(obj)//different from isEqualContent method
{	
	var same = false;
	var validValues = [];
	if (obj.length == 0) return '';
	for (var i=0; i<obj.length; i++){
		if (!isEmpty(obj[i])) validValues.push(obj[i]);
	}	
	for (var i=0; i<validValues.length; i++){
		if (validValues[i] == validValues[0]) {
			same = true;
		}else same = false;
	}
	if (same) return validValues[0]; else return '';
}

function sameValuesInArray(obj)
{	
	var same = false;
	var validValues = [];
	if (obj.length == 0) return same;
	for (var i=0; i<obj.length; i++){
		if (!isEmpty(obj[i])) validValues.push(obj[i]);
	}	
	for (var i=0; i<validValues.length; i++){
		if (validValues[i] == validValues[0]) {
			same = true;
		}else same = false;
	}
	return same;
}

	function fillTile(tile, tdId, board){
		switch (tdId){
				case 0:{
				if (isEmpty(board.sq0)) //we dont tiles being replaced
					board.sq0 = tile;
				else return false;
			}break;
			case 1:{
				if (isEmpty(board.sq1))
					board.sq1 = tile;
				else return false;
			}break;
			case 2:{
				if (isEmpty(board.sq2))
					board.sq2 = tile;
				else return false;
			}break;
			case 3:{
				if (isEmpty(board.sq3))
					board.sq3 = tile;
				else return false;
			}break;
			case 4:{
				if (isEmpty(board.sq4))
					board.sq4 = tile;
				else return false;
			}break;
			case 5:{
				if (isEmpty(board.sq5))
					board.sq5 = tile;
				else return false;
			}break;
			case 6:{
				if (isEmpty(board.sq6))
					board.sq6 = tile;
				else return false;
			}break;
			case 7:{
				if (isEmpty(board.sq7))
					board.sq7 = tile;
				else return false;
			}break;
			case 8:{
				if (isEmpty(board.sq8))
					board.sq8 = tile;
				else return false;
			}break;
		}		
		return board;
}

function getSquareByNo(n, board){
	switch (n){
		case 0: return board.sq0; break;
		case 1: return board.sq1; break;
		case 2: return board.sq2; break;
		case 3: return board.sq3; break;
		case 4: return board.sq4; break;
		case 5: return board.sq5; break;
		case 6: return board.sq6; break;
		case 7: return board.sq7; break;
		case 8: return board.sq8; break;
	}
}

function checkWin(n,board){
	var winningCombo = getWinningCombo(n);
	for (var i=0; i<winningCombo.length; i++){
		var combo = winningCombo[i];
		var squareValues = [getSquareByNo(combo[0], board), getSquareByNo(combo[1], board), getSquareByNo(combo[2], board)];
		if (isEqualContent(squareValues)) return combo;		
	}
	return null;
}

function countValuesInArr(obj){
	var count = 0;
	for (var i=0; i<obj.length; i++){
		if (!isEmpty(obj[i]))
			count++;
	}
	return count;
}

function getRandomFromArray(obj){
	return obj[Math.floor(Math.random() * obj.length)];
}

function randomNo(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function log(message){
	console.log(message);
}

/*function isBetween(n, min, max){
	if (n >= min && n <= max)
		return true;
	else return false;
}

function isValidInSeries(n, min, max, combo){	
	if (isBetween(n,min,max) && combo.indexOf(n) < 0)
	return true;
else return false;
}*/

	