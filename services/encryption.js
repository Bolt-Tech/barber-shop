import bcrypt from 'bcryptjs';

export const generateHash = async (password, saltRounds=10) => {
    console.log('got here');

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch(e) {
        console.log(e)
    }
    
}

// (async () => {
//     await generateHash('12345');
// })()