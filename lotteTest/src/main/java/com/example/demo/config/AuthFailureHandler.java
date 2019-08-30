package com.example.demo.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

@Component
public class AuthFailureHandler extends SimpleUrlAuthenticationFailureHandler {

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		// 실패 시 response를 json 형태로 결과값 전달
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String errorMsg = null;
		if (exception instanceof BadCredentialsException) {
			errorMsg = "비밀번호가 일치하지 않습니다.\n";
		} else if (exception instanceof InternalAuthenticationServiceException) {
			errorMsg = "존재하지 않는 아이디입니다.\n";
		} else if (exception instanceof LockedException) {
			errorMsg = "계정이 잠겨있습니다. 관리자에게 문의해주세요.\n";
		}

		request.setAttribute("username", username);
		request.setAttribute("password", password);
		request.setAttribute("errorMsg", errorMsg);

		request.getRequestDispatcher("/user/signin?error").forward(request, response);
	}
}
