# ĐẶC TẢ DỰ ÁN QUẢN LÝ KANBAN

## PHẦN 1: CẤU TRÚC HỆ THỐNG & AUTHENTICATION

### 1.1 Authentication & Authorization
* **Mô tả**: Hệ thống đăng nhập/đăng ký với nhiều phương thức
* **Đầu vào**: 
  * Email/password (validate email format, mật khẩu mạnh)
  * Social login (Google, GitHub)
* **Đầu ra**: 
  * JWT token (access token + refresh token)
  * User session (lưu thông tin người dùng)
  * Auth state (logged in/out)
* **Yêu cầu kỹ thuật**:
  * Sử dụng JWT với expiry time và refresh token 
  * Lưu token user với secure HTTP only cookies
  * Password hashing (bcrypt/Argon2)
* **UI**:
  * Form đăng nhập/đăng ký responsive
  * Social login buttons với OAuth flow
  * Forgot password flow với email verification
  * Profile management screen (thay đổi password, thêm 2FA)

### 1.2 Workspace
* **Mô tả**: Workspace là đơn vị tổ chức cao nhất, tương tự một công ty hoặc nhóm làm việc. Người dùng có thể tạo và mời thành viên.
* **Đầu vào**: 
  * Tên workspace (bắt buộc, tối đa 100 ký tự)
  * Ảnh đại diện (tùy chọn, định dạng PNG/JPG, tối đa 2MB)
  * Danh sách email của người dùng được mời (có thể mời nhiều người cùng lúc)
  * Ngôn ngữ mặc định (tiếng Anh, tiếng Việt)
  * Theme settings (light/dark/system)
* **Đầu ra**: 
  * Thông tin workspace (ID, tên, ảnh, ngày tạo)
  * Danh sách thành viên (tên, email, role, trạng thái: pending/active)
  * Danh sách project thuộc workspace
  * Active users trong workspace (real-time)
* **Yêu cầu kỹ thuật**:
  * API REST/RTK Query để tạo, cập nhật, xóa workspace
  * Realtime update danh sách thành viên khi mời hoặc xóa (WebSocket/SSE)
  * Gửi email mời với link xác nhận (tích hợp SMTP như SendGrid)
  * Hỗ trợ đa ngôn ngữ cho email mời (i18next)
  * Theme settings lưu theo workspace và user preference
  * Activity logs cho workspace actions
  * Lưu trữ ảnh đại diện trên CDN hoặc Firebase Storage
* **UI**:
  * Sidebar workspace với theme tùy chỉnh (hiển thị danh sách workspace)
  * Dialog "Tạo workspace" với form validation
  * Modal "Invite member" với email validation (hỗ trợ nhập nhiều email)
  * Dashboard tổng quan workspace với metrics (số project, active tasks, members)
  * Activity feed hiển thị hoạt động gần đây
  * Toast notification khi mời thành công/thất bại

### 1.3 Members trong Workspace
* **Mô tả**: Quản lý danh sách thành viên trong workspace, mỗi thành viên có vai trò và mức lương theo giờ.
* **Đầu vào**: 
  * Email của thành viên (bắt buộc, định dạng hợp lệ)
  * Role: admin (toàn quyền), manager (quản lý project), editor (chỉnh sửa), viewer (chỉ xem)
  * Rate/hour (USD, bắt buộc, số dương)
  * Skills (tùy chọn, tags)
  * Avatar (tùy chọn)
* **Đầu ra**: 
  * Danh sách thành viên với thông tin chi tiết
  * Online status (active/idle/offline)
  * Last activity timestamp
  * Filtered members theo role hoặc skills
* **Yêu cầu kỹ thuật**:
  * RBAC với permission matrix chi tiết:
    * Admin: CRUD workspace, project, member
    * Manager: CRUD project, assign members
    * Editor: CRUD task, cập nhật trạng thái
    * Viewer: chỉ xem thông tin, không chỉnh sửa
  * Realtime update danh sách thành viên và status
  * Permission inheritance từ workspace xuống projects
  * Xử lý xung đột quyền (không cho phép xóa admin cuối cùng)
  * Lưu lịch sử thay đổi quyền (audit log)
  * Throttling API requests cho security (rate limiting)
* **UI**:
  * Data table danh sách thành viên (cột: tên, email, role, rate/hour, trạng thái)
  * Dropdown để thay đổi role, input để cập nhật rate/hour
  * User profile card với thông tin chi tiết và biểu đồ hoạt động
  * Indicators cho online/offline status
  * Button "Xóa thành viên" với xác nhận
  * Modal hiển thị audit log thay đổi quyền
  * Search và filter trong danh sách

## PHẦN 2: DỰ ÁN VÀ PHÂN QUYỀN

### 2.1 Project
* **Mô tả**: Mỗi workspace chứa nhiều project, mỗi project là một đơn vị công việc với các task được quản lý theo Kanban.
* **Đầu vào**: 
  * Tên project (bắt buộc, tối đa 100 ký tự)
  * Mô tả (tùy chọn, tối đa 1000 ký tự, hỗ trợ markdown)
  * Ngày bắt đầu, deadline (bắt buộc, định dạng ISO)
  * Budget (tùy chọn, số dương)
  * Priority (tùy chọn: low, medium, high, urgent)
  * Tags (tùy chọn, ví dụ: "urgent", "client")
* **Đầu ra**: 
  * Thông tin project (ID, tên, mô tả, ngày, budget, tags, trạng thái: active/archived)
  * Danh sách Kanban board (columns, tasks)
  * Progress metrics (% hoàn thành, budget usage)
  * Resource utilization (allocation của members)
* **Yêu cầu kỹ thuật**:
  * CRUD project qua API REST/RTK Query với optimistic updates
  * Gán member vào từng project với custom roles
  * Version control cho project settings (lịch sử thay đổi)
  * Lưu trữ tags dưới dạng mảng JSON
  * Search engine cho projects (Elasticsearch/Algolia)
  * Hỗ trợ tìm kiếm project theo tên, tags, hoặc ngày
  * Lưu lịch sử thay đổi project (audit log)
  * Archived projects management (restore function)
* **UI**:
  * Danh sách project dạng card/list/grid view (toggle view)
  * Modal tạo/sửa project với multi-step wizard và form validation
  * Project detail page với tabs (Overview, Board, Timeline, Reports)
  * Progress bar và deadline indicators
  * Button archive/unarchive project
  * Ô tìm kiếm project với suggestions
  * Drag & drop sorting của projects

### 2.2 Gán member vào project
* **Mô tả**: Chỉ thành viên được gán vào project mới có quyền truy cập. Mỗi thành viên có vai trò và rate/hour riêng trong project.
* **Đầu vào**: 
  * Member ID (từ danh sách thành viên workspace)
  * Role trong project: leader (quản lý), member (thực hiện), guest (chỉ xem)
  * Rate/hour override (override rate mặc định, bắt buộc)
  * Working hours (tùy chọn, giới hạn số giờ/tuần)
  * Notification preferences (email, in-app)
* **Đầu ra**: 
  * Danh sách thành viên trong project (tên, role, rate/hour)
  * Workload metrics (assigned tasks, estimated hours)
* **Yêu cầu kỹ thuật**:
  * ACL (Access Control List) để kiểm soát quyền trong project:
    * Leader: CRUD project, task, gán thành viên
    * Member: CRUD task
    * Guest: chỉ xem
  * Cơ chế override quyền và rate/hour từ workspace settings
  * Time zone handling cho distributed teams
  * Workload calculation dựa trên assignment (prevent overallocation)
  * Batch operations cho members (bulk add/remove)
  * Realtime update danh sách thành viên trong project
  * Lưu lịch sử gán/xóa thành viên (audit log)
* **UI**:
  * Modal "Add thành viên vào Project" với search & filter
  * Table list member + phân quyền với inline editing
  * Member assignment distribution chart
  * Workload heatmap theo calendar
  * Button xóa thành viên với xác nhận
  * Bulk actions (thêm/xóa nhiều member cùng lúc)

### 2.3 Template & Cloning
* **Mô tả**: Tạo template từ project có sẵn hoặc clone project để tái sử dụng cấu trúc.
* **Đầu vào**: 
  * Project source (ID project nguồn)
  * Custom settings cho new instance (tên, ngày, members)
  * Clone options (structure only, with tasks, with members)
* **Đầu ra**: 
  * Project mới với settings được copy từ nguồn
  * Template library (saved templates)
* **Yêu cầu kỹ thuật**:
  * Deep clone logic với relations preservation
  * Template library (built-in và custom templates)
  * Partial cloning (chỉ board structure, không có tasks)
  * Migration script cho data transfer
  * Version tracking của templates
* **UI**:
  * Template gallery với preview
  * Clone wizard với options tùy chỉnh
  * Import/Export projects tới JSON/Excel
  * Template management screen

## PHẦN 3: QUẢN LÝ TASK (KANBAN)

### 3.1 Board & Column
* **Mô tả**: Quản lý các cột trong Kanban như "To do", "In Progress", "Done" để phân loại task theo trạng thái.
* **Đầu vào**: 
  * Tên column (bắt buộc, tối đa 50 ký tự)
  * Vị trí (số thứ tự, bắt buộc)
  * WIP limit (tùy chọn, giới hạn task trong column)
  * Auto-actions (tùy chọn, actions khi task vào column)
  * Color (tùy chọn, màu header column)
* **Đầu ra**: 
  * Danh sách column theo thứ tự (ID, tên, vị trí, WIP limit)
  * UI hiển thị Kanban board
  * Column metrics (task count, completion rate)
* **Yêu cầu kỹ thuật**:
  * Drag & drop column để thay đổi thứ tự (dnd-kit)
  * Order bằng số thứ tự với atomic updates
  * WIP (Work In Progress) limits với cảnh báo
  * Column policies (required fields for tasks in column)
  * Column templates với predefined settings
  * API REST/RTK Query để CRUD column
  * Realtime update khi thêm/sửa/xóa column
  * Hỗ trợ tối đa 10 column mỗi board
* **UI**:
  * Kanban board kiểu Trello, mỗi column hiển thị tên và danh sách task
  * Add/edit/delete column với contextual menu
  * Column metrics (count, completion rate)
  * Collapsible columns để tiết kiệm không gian
  * Filter và group options trên board
  * Button thêm column ở cuối board
  * Dropdown chỉnh sửa/xóa column
  * Hỗ trợ swipe column trên mobile

### 3.2 Task
* **Mô tả**: Task là đơn vị công việc trong column, có thông tin chi tiết và được thực hiện bởi thành viên.
* **Đầu vào**: 
  * Tên task (bắt buộc, tối đa 200 ký tự)
  * Mô tả (tùy chọn, hỗ trợ markdown/rich text, tối đa 5000 ký tự)
  * Estimated time (est, giờ, bắt buộc, số dương)
  * Assignee(s) (member ID, tùy chọn, có thể nhiều người)
  * Deadline (tùy chọn, định dạng ISO)
  * Priority (tùy chọn: low, medium, high, urgent)
  * Tags (tùy chọn, ví dụ: "urgent", "bug")
  * Custom fields (tùy chọn, e.g., priority, status)
  * Task dependencies (tùy chọn, liên kết với task khác)
  * Checklist items (tùy chọn, sub-tasks với completion status)
  * Attachments (tùy chọn, files liên quan)
* **Đầu ra**: 
  * Thông tin task đầy đủ
  * Thời gian thực tế (actual time, tính khi task hoàn thành)
  * Trạng thái dependencies
  * Progress % dựa trên checklist
* **Yêu cầu kỹ thuật**:
  * Co-edit task (nhiều người chỉnh sửa cùng lúc) sử dụng Yjs + CRDT
  * Realtime update khi thay đổi task với conflict resolution
  * Offline support (lưu localStorage, sync khi online)
  * Error boundary cho các hành động CRUD task (hiển thị toast, retry)
  * Drag & drop task giữa các column
  * Task versioning và history (undo/redo changes)
  * Rich text editor với markdown support
  * File upload cho attachments (hỗ trợ preview)
  * Lưu lịch sử thay đổi task (audit log)
* **UI**:
  * Task card trong column (hiển thị tên, assignee, deadline, priority)
  * Modal chi tiết task với tabs (details, attachments, comments, history)
  * Rich text editor cho description với formatting tools
  * Giao diện gán assignee + est time với suggestions
  * Progress bar cho checklists và overall completion
  * Inline editing cho fields
  * File attachment preview
  * Dependency visualization

### 3.3 Task Dependencies
* **Mô tả**: Tasks có thể phụ thuộc vào nhau, tạo thành network của công việc liên quan.
* **Đầu vào**: 
  * Parent/child relationships
  * Blockers (tasks that block this task)
  * Related tasks (liên quan nhưng không blocking)
* **Đầu ra**: 
  * Dependency graph
  * Critical path
  * Blocked/blocking status
* **Yêu cầu kỹ thuật**:
  * Circular dependency detection & prevention
  * Auto-scheduling based on dependencies
  * Notification khi blocked task được completed
  * Critical path calculation cho timeline
  * Dependency impact analysis (khi change deadline)
* **UI**:
  * Dependency visualization (network graph)
  * Inline dependency creating/editing
  * Visual indicators trên task cards (blocked/blocking)
  * Critical path highlighting trong Gantt view
  * Warning khi attempt to violate dependencies

### 3.4 Comments & Activity
* **Mô tả**: Theo dõi thảo luận và activity trên task để giao tiếp và lưu lịch sử.
* **Đầu vào**: 
  * Comment text (rich text editor)
  * @mentions (link to team members)
  * Reactions (emoji)
  * Attachments (files, images)
* **Đầu ra**: 
  * Thread comments với hierarchy
  * Activity timeline
  * Notification cho mentions
* **Yêu cầu kỹ thuật**:
  * Realtime commenting với optimistic UI
  * @mentions với notifications
  * File uploads (images, documents)
  * Activity logging chi tiết
  * Comment editing history
* **UI**:
  * Comment threads với nesting (reply structure)
  * Rich text editor cho comments
  * Activity timeline với filters
  * Emoji reactions
  * File attachment preview
  * Mention typeahead (@username)

## PHẦN 4: THEO DÕI CHI PHÍ - HIỆU SUẤT

### 4.1 Chi phí theo task
* **Mô tả**: Tính chi phí dựa trên rate/hour của assignee và estimated/actual time của task.
* **Đầu vào**: 
  * Rate/hour của assignee (lấy từ project hoặc workspace)
  * Estimated time (est) và actual time (nếu có)
  * Currency settings (USD, EUR, VND, etc.)
* **Đầu ra**: 
  * Chi phí dự kiến: cost = est * rate
  * Chi phí thực tế: actual cost = actual time * rate
  * Variance: actual - expected (số tuyệt đối và %)
* **Yêu cầu kỹ thuật**:
  * Đồng bộ rate/hour giữa workspace, project, và task
  * Handle rate override per project và per task
  * Currency conversion với historical rates
  * Budget alerts khi vượt ngưỡng (>80%, >100%)
  * Tax calculation options (có thể thêm % thuế)
  * Cost aggregation theo project/member
* **UI**:
  * Trong modal chi tiết task hiển thị: chi phí dự kiến, chi phí thực tế, variance
  * Budget usage visualizations (progress bar)
  * Cost breakdown theo components
  * Currency selector với live conversion
  * Màu sắc: xanh (under budget), đỏ (over budget)

### 4.2 Time Tracking
* **Mô tả**: Theo dõi giờ làm việc thực tế trên từng task với timer hoặc manual entry.
* **Đầu vào**: 
  * Start/stop events từ timer
  * Manual time entries (start, end, duration)
  * Idle detection settings
* **Đầu ra**: 
  * Actual time spent
  * Time logs chi tiết (who, when, duration)
  * Weekly/monthly reports
* **Yêu cầu kỹ thuật**:
  * Timer functionality với auto-save (mỗi phút)
  * Idle detection để avoid fake tracking (pause sau 5 phút không hoạt động)
  * Time entry approval flow (cho team leaders)
  * Rounding rules (nearest 15min, etc.)
  * Timer reminder notifications
  * Export timesheet (Excel, CSV)
* **UI**:
  * Timer controls (start/stop/pause)
  * Time entry form (manual)
  * Weekly timesheet view
  * Time logs với filter và search
  * Calendar integration (optional)
  * Summary dashboard của time spent

### 4.3 Biểu đồ chi phí
* **Mô tả**: Tổng hợp chi phí theo member, task, hoặc project dưới dạng biểu đồ trực quan.
* **Đầu vào**: 
  * Dữ liệu task (est, actual time, rate/hour)
  * Bộ lọc: theo member, project, khoảng thời gian
  * Grouping options (by member, tag, priority)
* **Đầu ra**: 
  * Bar chart, Pie chart, Line chart hiển thị chi phí
  * Trend analysis (over time)
  * Comparative analysis (plan vs. actual)
* **Yêu cầu kỹ thuật**:
  * Sử dụng Recharts với responsive design
  * Phân màu (blue = under budget, red = over)
  * Data aggregation services (calculate summaries)
  * Exportable reports (PDF, Excel)
  * Custom date ranges with presets (this week, month, quarter)
  * Caching chart data cho performance
* **UI**:
  * Tab "Báo cáo" trong project
  * Bộ lọc theo member, ngày, task, label
  * Interactive charts với tooltips và drill-down
  * Toggle giữa chart types (bar, pie, line)
  * Print-friendly reports
  * Button export báo cáo (PDF, Excel)

### 4.4 Biểu đồ thời gian
* **Mô tả**: So sánh estimated time và actual time của task với timeline visualization.
* **Đầu vào**: 
  * Estimated time, actual time, deadline của tasks
  * Milestones và dependencies
  * Date range filter
* **Đầu ra**: 
  * Gantt chart với timeline
  * Delay/ahead indicators
  * Critical path highlighting
* **Yêu cầu kỹ thuật**:
  * Hiển thị thanh est (xanh), thực tế (vàng), overdue (đỏ)
  * Cảnh báo task trễ (email hoặc in-app notification)
  * Timeline recalculation khi có changes
  * Dependency visualization trong timeline
  * Snapshot comparison (baseline vs. actual)
  * Export timeline (PNG, PDF)
* **UI**:
  * Gantt-style chart với drag-and-drop
  * Timeline scaling (day/week/month views)
  * Timeline filtering theo member/label
  * Critical path highlighting
  * Milestone markers
  * Baseline comparison toggle

### 4.5 Hiệu suất
* **Mô tả**: Tính hiệu suất cá nhân và team dựa trên est/actual time và chi phí.
* **Đầu vào**: 
  * Dữ liệu task theo user (est, actual)
  * Time entries và completion metrics
  * Historical performance data
* **Đầu ra**: 
  * % Hiệu suất: (est / actual) * 100 (capped tại 100%)
  * KPIs cho cá nhân và team
  * Trend analysis
  * Ranking giữa members
* **Yêu cầu kỹ thuật**:
  * Tính trung bình hiệu suất theo tuần/tháng/quý
  * So sánh giữa users với normalized scoring
  * Performance trends over time (improvement/decline)
  * Custom KPI definitions
  * Team vs individual metrics
  * Exportable performance reports
* **UI**:
  * Bảng xếp hạng hiệu suất với animation
  * Performance dashboards với multiple metrics
  * Trend charts (weekly/monthly)
  * Heat maps cho performance visualization
  * Personal performance insights
  * Team performance overview
  * Detailed breakdown khi click vào metrics

## PHẦN 5: NÂNG CAO TRẢI NGHIỆM NGƯỜI DÙNG

### 5.1 Notifications & Reminders
* **Mô tả**: Hệ thống thông báo đa kênh (in-app, email, push) cho sự kiện trong hệ thống.
* **Đầu vào**: 
  * Events (task assignment, comment, deadline, etc.)
  * Notification preferences của user
  * Delivery channels (in-app, email, push)
* **Đầu ra**: 
  * Notifications được gửi qua các kênh
  * Notification history
  * Read/unread status
* **Yêu cầu kỹ thuật**:
  * In-app notifications với websockets
  * Email notifications với HTML templates (responsive)
  * Push notifications cho mobile/desktop (Firebase FCM)
  * Notification grouping và digests (daily summary)
  * Notification center với read/unread state
  * Customizable notification preferences
* **UI**:
  * Notification bell với badge counter
  * Notification center dropdown
  * Notification settings screen
  * Real-time notification toast
  * Email template builder (optional)

### 5.2 Search & Filter
* **Mô tả**: Tìm kiếm nâng cao trong toàn bộ hệ thống với nhiều tiêu chí lọc.
* **Đầu vào**: 
  * Search query (text)
  * Filters (project, type, date, assignee, status, etc.)
  * Sort options (date, priority, name)
* **Đầu ra**: 
  * Kết quả tìm kiếm với highlighting
  * Relevance scoring
  * Grouped results (by type, project)
* **Yêu cầu kỹ thuật**:
  * Full-text search (Elasticsearch/Algolia)
  * Filter combinations với debouncing
  * Search history và saved searches
  * Indexed content cho performance
  * Fuzzy matching và relevance ranking
  * Search analytics để cải thiện kết quả
* **UI**:
  * Search bar với autocomplete suggestions
  * Advanced filter panel với multiple criteria
  * Saved search management
  * Search results với highlights
  * Quick actions từ search results
  * Keyboard shortcuts cho search

### 5.3 Dashboards & Widgets
* **Mô tả**: Dashboards tùy chỉnh với drag-drop widgets để hiển thị thông tin quan trọng.
* **Đầu vào**: 
  * Widget selection từ library
  * Layout preferences
  * Data sources và filter settings
  * Refresh intervals
* **Đầu ra**: 
  * Interactive dashboards với live data
  * Multiple layouts cho different purposes
  * Shared dashboards giữa team
* **Yêu cầu kỹ thuật**:
  * Widget library với custom options
  * Drag-drop layout với grid system
  * Dashboard sharing và permissions
  * Auto-refresh với configurable intervals
  * Dashboard templates và presets
  * Data source connectors
* **UI**:
  * Widget gallery với categories
  * Dashboard editor với grid layout
  * Widget configuration modals
  * Dashboard switching và sharing
  * Export dashboard (PDF/image)
  * Mobile-responsive dashboard views

### 5.4 Integrations
* **Mô tả**: Tích hợp với các công cụ phổ biến (GitHub, Slack, Google Calendar) để sync data.
* **Đầu vào**: 
  * Integration authorization (OAuth)
  * Configuration parameters
  * Mapping settings (field mapping)
* **Đầu ra**: 
  * Synchronized data giữa systems
  * Activity logs cho integration events
  * Bi-directional updates
* **Yêu cầu kỹ thuật**:
  * OAuth flows cho external services
  * Webhook handling (incoming/outgoing)
  * Data synchronization với conflict resolution
  * Event mapping giữa systems
  * API rate limit handling
  * Secure storage của integration credentials
* **UI**:
  * Integration directory với categories
  * OAuth authorization screens
  * Integration configuration wizards
  * Activity logs for integration events
  * Connection status indicators
  * Troubleshooting tools

### 5.5 Mobile Support
* **Mô tả**: Progressive Web App (PWA) hoặc Mobile-responsive design cho trải nghiệm trên thiết bị di động.
* **Đầu vào**: 
  * Device capabilities (screen size, touch)
  * Offline requirements
  * Mobile-specific interactions
* **Đầu ra**: 
  * Mobile-friendly UI
  * Offline capabilities
  * Native-like experience
* **Yêu cầu kỹ thuật**:
  * PWA with service workers
  * Offline-first architecture
  * Touch-optimized UI components
  * Responsive layout với breakpoints
  * Push notifications cho mobile
  * App shell model cho fast loading
* **UI**:
  * Mobile navigation (bottom tabs)
  * Touch-friendly controls (larger tap targets)
  * Simplified views cho small screens
  * Mobile-specific gestures (swipe, pull-to-refresh)
  * Install banner cho PWA
  * Offline indicator và sync status
