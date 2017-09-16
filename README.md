# ForestFireSim

[ForestFireSim live](https://williamlemus.github.io/ForestFireSim/)

![Sample Fire](https://github.com/williamlemus/ForestFireSim/blob/master/docs/images/NoWind.gif "Sample Fire")

### Background
Wildfire modeling is used to help predict where to allocate resources to protect ecological environments.

This simulation will create will be an example of cellular automata. It is written in JavaScript and uses Canvas for 2D rendering.

### How to use

A point can be selected on the map; if there is a tree on that cell, a fire will start to spread. The percentage of fire spread and wind direction can be chosen to affect how the fire will spread. By default, it is set to 50%.

The 'Pick for me' button can also be pressed to start a fire at a random location.

### Features
#### Random fire location
The user can let the map pick it's own cell on the canvas. This is done by checking if the location has a tree, and proceeding to start the simulation.

``` JS
handleRandomClick(){
  let randLocation = [Math.floor(Math.random()*ROWS), Math.floor(Math.random()*COLS)]
  this.getPreferences();
  while(!this.grid[randLocation[0]][randLocation[1]].tree()){
    randLocation = [Math.floor(Math.random()*ROWS), Math.floor(Math.random()*COLS)]
  }
  this.burningTrees.push(randLocation);
  this.startBurn();
}
```

#### Wind direction

Wind direction is modified by increasing the probability the fire will spread in the direction of the fire, while at the same time decreasing the probability in every other direction. Also, the animation is sped up to show a faster spreading fire.

Fire with a eastern wind direction:

![Sample Fire](https://github.com/williamlemus/ForestFireSim/blob/master/docs/images/EastWind.gif "Sample Fire East")

Fire with a western wind direction:

![Sample Fire](https://github.com/williamlemus/ForestFireSim/blob/master/docs/images/WestWind.gif "Sample Fire West")
