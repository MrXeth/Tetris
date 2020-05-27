# Tetris
This is a really optimized Tetris version coded in Javascript.

To achieve that it mainly uses the following features:
* save block data bitwise
* bitwise rotations
* good readable neat and tidy code

# save block data bitwise
Have a look at [this image](./res/orientation.png) to understand, how the block offsets are in detail.
To do that I use the following format: x1y1-x2y2-x3y3. Every offset preserves three signed bits.

# bitwise rotations
To manage bitwise rotations the program uses bitwise operations to inverse the needed x/y coordinates using the following simple rotation matrices:

90°
|0|-1|  
|-|-|   
|1|0| 

180°
|0|1|
|-|-|
|1|0|

270°
|0|1|
|-|-|
|-1|0|
