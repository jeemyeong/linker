package linker.category;

import com.fasterxml.jackson.annotation.JsonProperty
import linker.user.User
import linker.user.UserDto
import linker.user.UserRepository
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.persistence.*

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 01/05/2018
 * Time: 9:55 PM
 */
@Repository
interface CategoryRepository : JpaRepository<Category, Long>

@CrossOrigin
@RestController
@RequestMapping("/categories")
class CategoryEntityController(val categoryService: CategoryEntityService) {

    @GetMapping("/{id}")
    fun getOne(@PathVariable id: Long) = categoryService.findById(id)

    @GetMapping("/all")
    fun all() = categoryService.findAll().sortedBy { it.order }

    @PostMapping("/")
    fun new(@RequestBody createCategoryCommand: CreateCategoryCommand) = categoryService.newColumn(createCategoryCommand)

    @PostMapping("/reorder/{id}")
    fun reorder(@PathVariable id: Long, @RequestBody reorderCategoryCommand: ReorderCategoryCommand) = categoryService.reorderColumn(id, reorderCategoryCommand)
}

@Service
class CategoryEntityService(val categoryRepository: CategoryRepository, val userRepository: UserRepository) {
    fun findById(id: Long) = categoryRepository.findById(id)

    fun findAll(): List<Category> = categoryRepository.findAll().sortedBy { it.order }

    fun newColumn(createCategoryCommand: CreateCategoryCommand): Category {
        val email = createCategoryCommand.email
        val user = Optional.ofNullable(userRepository.findByEmail(email).firstOrNull()).orElseThrow { throw IllegalArgumentException("Cannot find by email: $email") }
        return categoryRepository.save(Category.fromDto(createCategoryCommand, user.toDto()))
    }

    fun reorderColumn(categoryId: Long, reorderCategoryCommand: ReorderCategoryCommand): List<Category> {
        val originLinkColumn = categoryRepository.findById(categoryId).orElseThrow { throw IllegalArgumentException("Cannot find by categoryId: $categoryId") }
        val newOrder = reorderCategoryCommand.newOrder
        val originOrder = originLinkColumn.order
        if (originOrder < newOrder) {
            categoryRepository.findAll().filter { it.order in (originOrder + 1)..(newOrder) }.map { it.order = it.order-1; it }.forEach{ categoryRepository.save(it) }
        } else {
            categoryRepository.findAll().filter { it.order in (newOrder)..(originOrder - 1) }.map { it.order = it.order+1; it }.forEach{ categoryRepository.save(it) }
        }
        originLinkColumn.order = newOrder
        categoryRepository.save(originLinkColumn)
        return findAll()
    }
}

@Entity
@Table(name = "categories")
data class Category(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = 0,
        @field:Column(nullable = false)
        val title: String,
        @field:ManyToOne(targetEntity = User::class, fetch = FetchType.LAZY)
        @field:JoinColumn(name = "user_id")
        @field:JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
        val user: User,
        @field:Column(name = "`order`")
        var order: Int
) {
    fun toDto(): CategoryDto = CategoryDto(
            id = this.id,
            title = this.title,
            user = this.user.toDto(),
            order = this.order
    )

    companion object {
        fun fromDto(dto: CategoryDto) = Category(
                id = dto.id,
                title = dto.title,
                user = User.fromDto(dto.user),
                order = dto.order
        )
        fun fromDto(dto: CreateCategoryCommand, userDto: UserDto) = Category(
                title = dto.title,
                user = User.fromDto(userDto),
                order = dto.order
        )
    }
}

data class CategoryDto(
        var id: Long,
        var title: String,
        var user: UserDto,
        val order: Int
)
data class CreateCategoryCommand(
        val title: String,
        val email: String,
        val order: Int
)
data class ReorderCategoryCommand(
        val newOrder: Int
)