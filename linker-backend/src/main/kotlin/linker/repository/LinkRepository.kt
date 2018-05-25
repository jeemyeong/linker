package linker.repository

import linker.entity.Category
import linker.entity.Link
import linker.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:40 PM
 */
@Repository
interface LinkRepository : JpaRepository<Link, Long> {
    fun findByCategory(category: Category): List<Link>
    fun findByCategoryId(categoryId: Long): List<Link>
    @Query(value = "select * from links l left join categories c on l.category_id = c.id WHERE c.user_id = ?1", nativeQuery = true)
    fun findAllLinksByUser(user: User): List<Link>
}
