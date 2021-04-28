
<!DOCTYPE html>
<html lang="en">
<meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
<head>
    @include('backend/layouts/__head')
</head>

<body>

<!-- Main navbar -->
<div class="navbar navbar-expand-md navbar-dark">
    <div class="navbar-brand">
        <a href="{{route('admin.index')}}" class="d-inline-block">
            <img src="{!! asset('public/img/logo.jpg') !!}" alt="logo">
        </a>
    </div>

    <div class="d-xl-none">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-demo3-mobile">
            <i class="icon-grid3"></i>
        </button>
    </div>

    <div class="collapse navbar-collapse" id="navbar-mobile">

        <ul class="navbar-nav ml-xl-auto">
            <li class="nav-item">
                <a href="#" class="navbar-nav-link">
                    <i class="icon-bell2"></i>
                    <span class="d-xl-none ml-2">Notifications</span>
                    <span class="badge badge-pill bg-warning-400 ml-auto ml-xl-0">2</span>
                </a>
            </li>
            <li class="nav-item dropdown dropdown-user">
                <a href="#" class="navbar-nav-link d-flex align-items-center dropdown-toggle" data-toggle="dropdown">
                    <img src="../../../../global_assets/images/demo/users/face11.jpg" class="rounded-circle mr-2" height="34" alt="">
                    <span>{!!Auth::user()->name!!}</span>
                </a>

                <div class="dropdown-menu dropdown-menu-right">
                    <a href="{{route('admin.user.edit_profile')}}" class="dropdown-item"><i class="icon-user-plus"></i> Thông tin tài khoản</a>
                    <a href="{{route('logout')}}" class="dropdown-item"><i class="icon-switch2"></i> Đăng xuất</a>
                </div>
            </li>
        </ul>
    </div>
</div>
<!-- /main navbar -->
<!-- Page content -->
<div class="page-content">

    <!-- Main content -->
    <div class="content-wrapper">

        <!-- Content area -->
        <div class="content d-flex justify-content-center align-items-center">

            <!-- Container -->
            <div class="flex-fill">

                <!-- Error title -->
                <div class="text-center mb-3">
                    <h1 class="error-title">403</h1>
                    <h5>Bạn không có quyền truy cập trang này! @if(session('count_work') >= 1) Bạn có công việc chưa hoàn thành. Bạn cần hoàn thành nó ! @endif</h5>
                </div>
                <!-- /error title -->
                <!-- Error content -->
                <div class="row">
                    <div class="col-xl-4 offset-xl-5 col-md-8 offset-md-2">
                        <!-- Buttons -->
                        <div class="row">
                            <div class="col-sm-6">
                                @if(session('count_work') >= 1)
                                    <a href="{{route('admin.work.index')}}" class="btn btn-primary btn-block"><i class="icon-home4 mr-2"></i> Quản lý công việc</a>
                                @else
                                    <a href="{{route('admin.index')}}" class="btn btn-primary btn-block"><i class="icon-home4 mr-2"></i> Trang chủ</a>
                                @endif
                            </div>
                        </div>
                        <!-- /buttons -->

                    </div>
                </div>
                <!-- /error wrapper -->

            </div>
            <!-- /container -->

        </div>
        <!-- /content area -->
        <!-- Footer -->
        @include('backend/layouts/__footer')
        <!-- /footer -->

    </div>
    <!-- /main content -->

</div>
<!-- /page content -->

</body>

</html>
