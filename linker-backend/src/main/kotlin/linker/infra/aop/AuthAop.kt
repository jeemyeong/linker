package linker.infra.aop

import linker.infra.helper.SignHelper
import org.aspectj.lang.JoinPoint
import org.aspectj.lang.annotation.Aspect
import org.aspectj.lang.annotation.Before
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 18/06/2018
 * Time: 12:57 AM
 */

@Aspect
@Component
class AuthAop {

    @Autowired
    lateinit var signHelper: SignHelper

    @Before("@annotation(linker.infra.annotation.Authenticated)")
    fun checkAuthUser(joinPoint: JoinPoint) {
        signHelper.checkTokenExpired()
    }
}