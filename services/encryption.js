import bcrypt from 'bcryptjs';

export const generateHash = async (password, saltRounds=10) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch(e) {
        console.log(e)
    }
    
}

export const checkPassword = async(password, passwordHash) => {
    return await bcrypt.compare(password, passwordHash);
}