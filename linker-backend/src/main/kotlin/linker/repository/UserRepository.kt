package linker.repository

import linker.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:41 PM
 */
@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun findByEmail(email: String): List<User>
}