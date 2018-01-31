import { login, logout } from '../../actions/auth';

test('sould generate login action object', () => {
	const uid = 'aze123';
	const action = login(uid);
	expect(action).toEqual({
		type: 'LOGIN', 
		uid
	});
});

test('sould generate logout action object', () => {
	const action = login();
	expect(action).toEqual({
		type: 'LOGIN'
	});
});