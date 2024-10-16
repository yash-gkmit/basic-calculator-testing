const mongoose = require('mongoose');
const Operation = require('../src/models/operation.model.js');
const {
  computeOperation,
  getOperationHistory,
  deleteOperationById,
  clearOperationHistory
} = require('../src/services/operation.service.js');

jest.mock('../src/models/operation.model.js'); 

describe('Operation Service Test Cases', () => {
  let operationCreateMock, operationFindMock, operationDeleteMock;

  beforeEach(() => {
    operationCreateMock = Operation.prototype.save = jest.fn();
    operationFindMock = Operation.find = jest.fn();
    operationDeleteMock = Operation.findByIdAndDelete = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should perform addition correctly', async () => {
    const payload = { operand1: 5, operand2: 3, operator: 'ADD' };
    const result = await computeOperation(payload, 'user@example.com');
    expect(result).toBe(8);
  });

  it('should perform subtraction correctly', async () => {
    const payload = { operand1: 10, operand2: 4, operator: 'SUB' };
    const result = await computeOperation(payload, 'user@example.com');
    expect(result).toBe(6);
  });

  it('should perform multiplication correctly', async () => {
    const payload = { operand1: 4, operand2: 5, operator: 'MUL' };
    const result = await computeOperation(payload, 'user@example.com');
    expect(result).toBe(20);
  });

  it('should perform division correctly', async () => {
    const payload = { operand1: 20, operand2: 4, operator: 'DIV' };
    const result = await computeOperation(payload, 'user@example.com');
    expect(result).toBe(5);
  });

  it('should throw error when dividing by zero', async () => {
    const payload = { operand1: 20, operand2: 0, operator: 'DIV' };
    await expect(computeOperation(payload, 'user@example.com')).rejects.toThrow('Cannot divide by zero');
  });

  it('should handle invalid operator', async () => {
    const payload = { operand1: 10, operand2: 5, operator: 'INVALID_OP' };
    await expect(computeOperation(payload, 'user@example.com')).rejects.toThrow('Invalid operator');
  });

  it('should save operation to history', async () => {
    const payload = { operand1: 5, operand2: 3, operator: 'ADD' };
    const expectedResult = { operand1: 5, operand2: 3, operator: 'ADD', result: 8, email: 'user@example.com' };
    operationCreateMock.mockResolvedValue(expectedResult);

    const result = await computeOperation(payload, 'user@example.com');
    expect(operationCreateMock).toHaveBeenCalled();
    expect(result).toBe(8);
  });

  it('should fetch history for a user', async () => {
    const email = 'user@example.com';
    const mockHistory = [
      { operand1: 5, operand2: 3, operator: 'ADD', result: 8, email },
      { operand1: 10, operand2: 2, operator: 'SUB', result: 8, email }
    ];

    operationFindMock.mockResolvedValue(mockHistory);
    const history = await getOperationHistory(email);

    expect(history.length).toBe(2);
    expect(history[0].result).toBe(8);
    expect(history[1].result).toBe(8);
  });

  it('should clear specific operation history', async () => {
    const id = 'fakeId';
    operationDeleteMock.mockResolvedValue({ acknowledged: true });

    const deleted = await deleteOperationById(id);
    expect(operationDeleteMock).toHaveBeenCalledWith(id); 
    expect(deleted.acknowledged).toBe(true); 
  })

  it('should reset all operation history for a user', async () => {
    const email = 'user@example.com';
    const mockDeletedCount = { deletedCount: 3 };

    Operation.deleteMany.mockResolvedValue(mockDeletedCount);
    const result = await clearOperationHistory(email);
    expect(result.deletedCount).toBe(3); 
  });
});
