



/**
 * @swagger
 * /school:
 *   post:
 *     tags:
 *       - Schools
 *     name: Register School
 *     summary: Register School
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:           
 *           type: object
 *           properties:
 *             name: 
 *               type: string
 *             type:
 *               type: string
 *             address:
 *               type: string
 *           example:
 *             name: schoolOne
 *             type : High
 *             address : gangnam
 *                 
 *     responses:
 *       '200':
 *         description: Register one Schhol
 *       '404':
 *         fail 
 
 *   get:
 *     tags:
 *       - Schools
 *     name: Get School
 *     summary: Get School
 *     parameters:
 *       - in: query
 *         name: schoolName         
 *         schema:           
 *           type: object
 *           properties:
 *             name: 
 *               type: string
 *     responses:
 *       '200':
 *         description: Get one Schhol
 *       '404':
 *         fail
 */

