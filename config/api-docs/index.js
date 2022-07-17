/**
 * @swagger
 *
 * /login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */

/**
 * @swagger
 *
 * /acc/vfy:
 *   post:
 *     tags:
 *       - 'Auth'
 *     summary: 'Account Verification'
 *     description: ''
 *     operationId: 'account verification'
 *     parameters:
 *       - in: 'body'
 *         name: 'body'
 *         description: ' object that needs to be added to the store'
 *         required: true
 *     responses:
 *       '400':
 *         description: ''
 *       '404':
 *         description: ''
 *       '405':
 *         description: 'Invalid input'
 *     security:
 *       - petstore_auth:
 *           - 'write:pets'
 *           - 'read:pets'
 */
