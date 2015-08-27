//TODO: Add moves count
mainApp.controller('homeController',function($scope){

	function validateForWin(tdId, board){
	var win = checkWin(tdId, board);	
	console.log('Check for Winner '+win);	
	if (win !== null){
		for (var i = 0; i < win.length; i++) {				
			angular.element('#'+win[i]).addClass('winSquare');
		};			
		var winPlayer = getSquareByNo(win[0], board) == 'X' ? 'Player 1' : 'Player 2';
		winPlayer = (winPlayer == 'Player 2' && $scope.p2MoveCount == 0) ? 'Computer' : winPlayer;
		$scope.message = 'Game Over, '+winPlayer+' Wins!';
		$scope.gameOver = true;
	}
}
	$scope.autoPlay = true;
	$scope.p1MoveCount = 0;
	$scope.p2MoveCount = 0;
	var board = [];
	var isX = true;
	$scope.gameOver = false;	
	$scope.tick = function(td){
		var autoPlay = $scope.autoPlay;
		if (!$scope.gameOver){
			var tile = 'X';
			if (!autoPlay){
				if (isX) tile = 'X';
				else tile = 'O';					
			}	
			var tdId = parseInt(td.target.attributes.id.value);
			var response =	fillTile(tile, tdId, board);
			if (response !== false){	
				if (tile === 'X') {$scope.p1MoveCount++; td.target.attributes.class.value = 'xSquare';}
			if (tile === 'O') {$scope.p2MoveCount++; td.target.attributes.class.value = 'oSquare';}
			board = response
			validateForWin(tdId, board);
		//computer plays.
		if (!$scope.gameOver && autoPlay) doAutoPlay('O', tdId, board);		
		isX = !isX;
		}	
	}		
};	

$scope.reset = function(){
	board = [];
	isX = true;
	$scope.gameOver = false;
	$scope.p1MoveCount = 0;
	$scope.p2MoveCount = 0;
	$scope.board = board;
	$scope.message = '';
	for (var i=0; i<=8; i++){
		angular.element('#'+i).removeClass('winSquare');
		angular.element('#'+i).removeClass('xSquare');
		angular.element('#'+i).removeClass('oSquare');
	}
};

$scope.toggleAutoPlay = function(){
	 $scope.autoPlay = !$scope.autoPlay;
};

$scope.board = board;

function doAutoPlay(tile, tdId, board){//after it plays, it should validate
	
	var playOptsOne = [];
	var playOptsTwo = [];
	var hasPlayed= false;
	
	//if its about winning
	for (var k=0; k<=8; k++){
		var combos = getWinningCombo(k);
		for (var i=0; i < combos.length; i++){
		//check all the combo to see which one or two filled -- TODO: two should take more priority
		var combo = combos[i];
		var squareValues = [getSquareByNo(combo[0], board), getSquareByNo(combo[1], board), getSquareByNo(combo[2], board)];
		var filledCount = countValuesInArr(squareValues);
		if (filledCount == 2)
		playOptsTwo.push({'combo':combo, 'squareValues':squareValues, 'count':filledCount});
		else if (filledCount == 1)
		playOptsOne.push({'combo':combo, 'squareValues':squareValues, 'count':filledCount});
	}
}

if (playOptsTwo.length > 0){
	for (var i=0; i<playOptsTwo.length; i++){
		var playOptions = playOptsTwo[i];
		if (sameValuesInArr(playOptions.squareValues) == 'O'){		
			autoTick(tile,playOptions.combo, board);
			return;
		}
	}
}

if (playOptsTwo.length > 0){
	for (var i=0; i<playOptsTwo.length; i++){
		var playOptions = playOptsTwo[i];
		if (sameValuesInArray(playOptions.squareValues)){
			autoTick(tile,playOptions.combo, board);
			return;
		}			
	}
}

if (playOptsOne.length > 0){
	//play in center, else play randomly
	if (isEmpty(getSquareByNo(4, board))){
		var combo = [4]
		autoTick(tile, combo, board);
		return;
	}else{
	var playIndex = randomNo(0, playOptsOne.length-1);	
	autoTick(tile, playOptsOne[playIndex].combo, board);
	return;
}
}
}

function autoTick(tile, combo, board){
	var options = [];
	for (var j=0; j<combo.length; j++){
		if (isEmpty(getSquareByNo(combo[j],board)))
				{//add it to options
					options.push(combo[j]);
				}				
			}
			if (options.length > 0){
				var tdId = getRandomFromArray(options);
				board = fillTile(tile, tdId, board);
				validateForWin(tdId, board);
				return true;
			}
		}
	});