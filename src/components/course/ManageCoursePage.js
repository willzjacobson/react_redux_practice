import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/course-actions';
import CourseForm from "./CourseForm";
import toaster from 'toastr';

class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          course: Object.assign({}, props.course),
          errors: {},
          saving: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.course.id !== nextProps.course.id) {
        // Populate form when a new course is loaded
        this.setState({course: Object.assign({}, nextProps.course)});
      }
    }

    updateCourseState(event) {
      const field = event.target.name;
      let course = Object.assign({}, this.state.course);
      course[field] = event.target.value;
      return this.setState({course});
    }

    saveCourse(event) {
      event.preventDefault();
      this.setState({ saving: true });
      this.props.actions.saveCourse(this.state.course)
        .then(() => this.redirect())
        .catch(err => {
          this.setState({ saving: false });
          toaster.error(err);
        });
    }

    redirect() {
      this.setState({ saving: false });
      toaster.success('Course saved');
      this.context.router.push('/courses');
    }

    render() {
        return (
            <CourseForm
              onChange={this.updateCourseState}
              onSave={this.saveCourse}
              course={this.state.course}
              errors={this.state.errors}
              allAuthors={this.props.authors}
              saving={this.state.saving}
            />
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

// Pull in the React Router context so router is available on this.context.router.
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id === id);
  if (course) return course[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id;
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  if (courseId && state.courses.length > 0) course = getCourseById(state.courses, courseId);

  const authorsFormattedForDropdown = state.authors.map(author => ({
    value: author.id,
    text: `${author.firstName} ${author.lastName}`
  }));

  return {
    course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
