import jwtLib from 'jsonwebtoken';
import type { RequestDataExtractor } from './requestDataExtractor';
import type { NightfortJWT } from './types';

const jwt = (token?: string) => {
	if (!token) {
		return null;
	}

	return jwtLib.decode(token) as NightfortJWT;
};

export default jwt;
