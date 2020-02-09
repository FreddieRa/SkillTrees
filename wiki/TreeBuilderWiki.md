# **Tree Builder**

This is the application in which the trees are actually built. It contains functionality for adding, removing, and editing nodes. 

## Commands

**`#`** : Saves the current state and layout, named after the first node you added.

**`8`** : This will snap every node to the nearest 20px.

## Modes:
1. **Add a new node**
    - If you type simply the 3-letter shortening (these can be found in the "Data" tab) then it will add an `[ID]: +1 [Statistic]` node. 
    - If you type the 3-letter shortening then a comma and a number it will add an `[ID]: +[Number] [Statistic]` node.
	- If you type `ult, [name]`, it will add an `[ID]: [name]` node as an Ultimate node.
	- If you type `blank` you will get an invisible node that can be used to organise connections more clearly. Make sure that only one of the connections involving the blank node is of the correct weight and all others are `0`.
	- If you type anything else it will add an `[ID]: [Whatever you typed]` node.
	- If you type `start` and press enter, you will begin making a "Start Node".
    	- It will next prompt you to enter a name.
      	- After that, enter the abbreviations and magnitudes as normal. These must only be skills or attributes.
      	- when finished, type `end`.

2. **Add a connection of weight 1.**
    - Click on one node and then another.
    - This will appear as a single line.

3. **Add a connection of a different weight.**
	- Click on one node and then another.
	- This will bring up a prompt to assign a weight to a connection.
	- You can do this again to override a previous connection.

4. **Move a node.**
	- Click and drag nodes to move them.
	- This is only for layout and has no effect on the functionality.
	- While in this mode:
		- Dragging the background will move all nodes at once.
		- Hold `up arrow` to scale everything larger (centre of scale is cursor).
		- Hold `down arrow` to scale everything smaller (centre of scale is cursor).
		- Hold `shift` and drag to select multiple nodes, which can then be moved by dragging the background.

5. **Edit a node.**
	- Click on a node to bring up an edit GUI.

6. **Delete a connection.**
	- Click on one node and then another, the connection will be removed.

7. **Delete a node.**
	- This will also delete all connections.