# Forest Fire Sim

### Background
Wildfire modeling is used to help predict where to allocate resources to protect ecological environments.

The version that this simulation will create will be an example of cellular automata.

The rules for in the system are as follows:



### Functionality & MVP
In this Forest Fire Sim, users will be able to:
- [ ] Start and reset the simulation
- [ ] Select a point where to start the fire, or have the program select a random starting point
- [ ] Modify probabilities and speed at which the fire spreads.
- [ ] Allow user to set percentage of forest that will contain trees.

Additionally, this project will include:
- [ ] Instructions on how to control the simulation
- [ ] A production README

### Architecture and Technology
This project will be implemented in JavaScript.

### Implementation Timeline
**Day 1**: Setup all necessary Node modules(if required), including getting webpack up and running. Create a basic outline of the entry file and the bare bones of any files that are required. Research the basics on how cellular automata rules can be implemented.

**Day 2**: Setup individual cell states. Ensure these states are rendered correctly.

**Day 3**: Setup the logic for the automata. Ensure that all grid states changes are handled correctly. Make sure this logic is incorporated with the render logic.

**Day 4**: Complete controls for user to interact with simulation. Ensure user can reset and modify probabilities correctly.


### Bonus features

Wildfire modeling has many avenues for exploration. Some updates that will be done once the base simulation is complete are:
- [ ] Factor in wind(and let user modify parameter)
- [ ] Enabled probability that tree may regrow
- [ ] Allow multiple fires to occur at once.
- [ ] Have cells that cannot catch on fire or grow trees
- [ ] Have a set of predefined states
