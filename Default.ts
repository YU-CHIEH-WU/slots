/// <reference path="angular.d.ts" />

var app = angular.module("myapp", []);

app.controller("gameController", function($timeout) {
	var self = this;
	self.coin = 100;
	self.tempId = Math.floor(Math.random() * 23);
	console.log(self.tempId);
	self.isActive = false;
	self.isRaise = false;
	self.reward = {};
	self.board = [
		{ id: 0, key: 3 }, { id: 1, key: 5 }, { id: 2, key: 1 }, { id: 3, key: 10 }, { id: 4, key: 2 }, { id: 5, key: 1 }, { id: 6, key: 4 }, { id: 7, key: 6 }, { id: 8, key: 1 }, { id: 9, key: 8 },
		{ id: 10, key: 2 }, { id: 11, key: 1 }, { id: 12, key: 3 }, { id: 13, key: 5 }, { id: 14, key: 1 }, { id: 15, key: 9 }, { id: 16, key: 2 }, { id: 17, key: 1 }, { id: 18, key: 4 }, { id: 19, key: 7 },
		{ id: 20, key: 1 }, { id: 21, key: 8 }, { id: 22, key: 2 }, { id: 23, key: 1 }
	];
	self.items = [
		{ key: 1, rate: 2, count: 0 }, { key: 2, rate: 5, count: 0 }, { key: 3, rate: 10, count: 0 }, { key: 4, rate: 15, count: 0 }, { key: 5, rate: 20, count: 0 },
		{ key: 6, rate: 20, count: 0 }, { key: 7, rate: 30, count: 0 }, { key: 8, rate: 40, count: 0 }, { key: 9, rate: 50, count: 0 }, { key: 10, rate: 100, count: 0 }
	];
	self.raise = function(item) {
		if (self.coin > 0) {
			self.isRaise = true;
			item.count++;
			self.coin--;
		}
		else {
			alert('代幣不足');
		}
	}
	self.animateTimeout = $timeout();
	self.endTimeout = $timeout();
	self.start = function() {
		if (self.isRaise) {
			var stop = Math.floor((Math.random() * 3 + 3) * 1000);
			console.log(stop);
			self.isActive = true;
			self.animate();
			self.endTimeout = $timeout(self.end, stop);
		}
		else {
			alert('請先下注');
		}
	};
	self.end = function() {
		$timeout.cancel(self.animateTimeout);
		angular.forEach(self.board, function(value, key) {
			if (self.isTarget(self.board[key].id))
				self.reward = self.board[key];
		});
		angular.forEach(self.items, function(value, key) {
			if (self.items[key].key === self.reward.key) {
				self.coin = self.coin + (self.items[key].rate * self.items[key].count);
			}
			self.items[key].count = 0;
		});
		self.isActive = false;
		self.isRaise = false;
		$timeout.cancel(self.endTimeout);
	}
	self.animate = function() {
		self.tempId++;
		if (self.tempId >= 24)
			self.tempId = 0;
		self.animateTimeout = $timeout(self.animate, 100);
	};
	self.isTarget = function(id) {
		return self.tempId == id;
	};
});