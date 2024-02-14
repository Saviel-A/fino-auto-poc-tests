//* Handles asynchronous operations by wrapping them in a try-catch block.
export async function catchAsync<T>(asyncOperation: () => Promise<T>): Promise<T | undefined> {
    try {
        return await asyncOperation();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}